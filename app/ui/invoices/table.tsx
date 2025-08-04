import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import {Card, Divider} from "@tremor/react";
import myImageLoader from "@/scripts/Loader";

export default async function InvoicesTable({query, currentPage}: { query: string; currentPage: number }) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root md:p-10">
      <div className="inline-block min-w-full align-middle md:p-0 text-tremor-background-emphasis dark:text-tremor-background">
        <div className="md:border-t-8 md:border-indigo-800 rounded-3xl">
          <div className="md:hidden grid grid-cols-1 gap-5">
            {invoices?.map((invoice) => (
              <Card
                key={invoice.id}
                className="w-[100%] rounded-md bg-white border-t-8 border-indigo-800 shadow-2xl shadow-indigo-800"
              >
                <div className="flex flex-col items-center justify-between">
                  <div>
                    <div className="mb-2 flex flex-col items-center">
                      <Image
                          loader={myImageLoader}
                        src={invoice.image_url}
                        className="mr-2 rounded-xl"
                        width={80}
                        height={80}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <Divider>
                    Invoice Status
                  </Divider>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full flex-col items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <Divider>
                    Actions
                  </Divider>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <table className="hidden min-w-full md:table overflow-hidden dark:text-tremor-background">
            <thead className="text-left text-sm font-normal text-gray-700 uppercase dark:bg-slate-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        alt={`${invoice.name}'s profile picture`}
                        className="rounded-full flex justify-center items-center"
                        width={50}
                        height={50}
                        loader={myImageLoader}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
