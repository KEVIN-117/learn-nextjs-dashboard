import { Revenue } from './definitions';
import { BreakdownEarningsCustomer as CustomerData, CombinedCustomerData } from './definitions';
export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export const combineData = (dataFull: CustomerData[], dataPaid: CustomerData[], dataPending: CustomerData[]): CombinedCustomerData[] => {
  const combinedData: { [key: string]: CombinedCustomerData } = {};

  [dataFull, dataPaid, dataPending].forEach(data => {
    data.forEach(item => {
      const { customersname, totalamount } = item;
      const amountNumber = Number(totalamount);
      const formattedAmount = formatCurrency(amountNumber);

      if (!combinedData[customersname]) {
        combinedData[customersname] = {
          name: customersname,
          amount: formattedAmount,
          totalCurrency: amountNumber,
          amountPaid: '0',
          amountPending: '0',
          paid: 0,
          pending: 0
        };
      }

      if (data === dataPaid) {
        combinedData[customersname].amountPaid = formattedAmount;
        combinedData[customersname].paid = amountNumber;
      } else if (data === dataPending) {
        combinedData[customersname].amountPending = formattedAmount;
        combinedData[customersname].pending = amountNumber;
      }
    });
  });

  return Object.values(combinedData);
};