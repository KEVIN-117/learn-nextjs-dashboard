import {QueryResult, sql} from '@vercel/postgres';
import {
  BreakdownEarningsCustomer, Customer,
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue
} from './definitions';
import {formatCurrency} from './utils';
import {unstable_noStore as noStore} from 'next/cache'

export async function fetchRevenue(): Promise<Revenue[]> {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const data: QueryResult<Revenue> = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore()
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore()
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(query: string,  currentPage: number) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredCustomer(query: string,  currentPage: number) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      ORDER BY customers.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchInvoicesPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchCustomerPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`}
  `;

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore()
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    return invoice[0];
  } catch (error) {
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore()
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
          customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
		LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
  } catch (err) {
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchBreakdownEarningsCustomer(){
  try {
    const dataFull = await sql<BreakdownEarningsCustomer>`
    SELECT customers.Name AS CustomersName, SUM(invoices.Amount) AS TotalAmount
    FROM invoices
    JOIN customers ON invoices.Customer_id = customers.Id
    GROUP BY customers.Name;
    `

    const dataPaid = await sql<BreakdownEarningsCustomer>`
        SELECT customers.Name AS CustomersName, SUM(invoices.Amount) AS TotalAmount
        FROM invoices
        JOIN customers ON invoices.Customer_id = customers.Id
        WHERE invoices.status = 'paid'
        GROUP BY customers.Name, invoices.id, customers.id;
    `
    const dataPending = await sql<BreakdownEarningsCustomer>`
        SELECT customers.Name AS CustomersName, SUM(invoices.Amount) AS TotalAmount
        FROM invoices
        JOIN customers ON invoices.Customer_id = customers.Id
        WHERE invoices.status = 'pending'
        GROUP BY customers.Name, invoices.id, customers.id;
    `
    const data = await Promise.all([dataFull, dataPaid, dataPending]);

    return {
        dataFull: data[0].rows,
        dataPaid: data[1].rows,
        dataPending: data[2].rows,
    }
  }catch (err){
    throw new Error('Failed to fetch customer.');
  }
}
/*
SELECT customers.Name AS CustomersName, SUM(invoices.Amount) AS TotalAmount
FROM invoices
JOIN customers ON invoices.Customer_id = customers.Id
WHERE invoices.status = 'paid'
GROUP BY customers.Name, invoices.id, customers.id;
 */

export async function fetchCustomersData(){
  noStore()
  try {
    const data = await sql<Customer>`
    SELECT
      *
    FROM customers
    ORDER BY name ASC
  `;

    return data.rows;
  } catch (err) {
    throw new Error('Failed to fetch all customers.');
  }

}