import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data'
const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};
import { Card as CardDesign } from '@tremor/react'

export default async function CardWrapper() {
  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData()
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({ title, value, type,}: { title: string; value: number | string; type: 'invoices' | 'customers' | 'pending' | 'collected'; }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-opacity-0 border border-opacity-25 backdrop-filter backdrop-blur-[17px] backdrop-saturate-200 text-tremor-background-emphasis dark:text-tremor-background p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <CardDesign
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        decoration="top" decorationColor="indigo"
      >
        {value}
      </CardDesign>
    </div>
  );
}
