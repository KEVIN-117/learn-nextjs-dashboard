'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {Card} from "@tremor/react";
import {updateInvoice as update} from '@/app/lib/actions'
import { useFormState } from 'react-dom'


export default function EditInvoiceForm({invoice, customers,}: { invoice: InvoiceForm; customers: CustomerField[]; }) {
  const initialState = {
    message: null,
    errors:{}
  }
  const updateInvoice = update.bind(null, invoice.id)
  const [state, dispatch] = useFormState(updateInvoice, initialState)
  return (
    <form action={dispatch}>
      <Card className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-gray-50 text-gray-900 p-2.5 dark:bg-gray-700 dark:text-white"
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
            state.errors.customerId.map((error)=>(
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                aria-describedby="amount-error"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-gray-50 text-gray-900 p-2.5 dark:bg-gray-700 dark:text-white"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-error" aria-atomic="true" aria-live="polite">
            {state.errors?.amount &&
            state.errors?.amount.map((error) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 peer block w-full cursor-pointer pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900 p-2.5 dark:bg-gray-700 dark:text-white">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'paid'}
                  aria-describedby="status-error"
                  className="h-4 w-4 cursor-pointer bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white checked:bg-indigo-600 dark:checked:bg-indigo-600 outline-0"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-700 px-3 py-1.5 text-xs font-medium text-tremor-background"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'pending'}
                  aria-describedby="status-error"
                  className="h-4 w-4 cursor-pointer bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white checked:bg-indigo-600 dark:checked:bg-indigo-600 outline-0"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="status-error" aria-atomic="true" aria-live="polite">
              {state.errors?.status &&
              state.errors?.status.map((error) => (
                  <p key={error} className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </fieldset>
        {state.message && <p className="mt-2 text-sm text-red-500"> {state.message} </p>}
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
