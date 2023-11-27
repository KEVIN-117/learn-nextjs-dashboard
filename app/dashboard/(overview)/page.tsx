import RevenueChart from '@/app/ui/dashboard/chart/revenue-chart'
import BreakdownEarningsCustomerAreaChart from '@/app/ui/dashboard/chart/breakdown-earnings-customer-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data'
import { Suspense } from 'react'
import {RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton} from '@/app/ui/skeletons'
import CardWrapper  from '@/app/ui/dashboard/cards'
export default async function Page(){
    const revenue = await fetchRevenue()
    const latestInvoices = await fetchLatestInvoices()
    return(
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper/>
                </Suspense>

            </div>
            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    {/**<RevenueChart revenue={revenue}  />**/}
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    {/**<RevenueChart revenue={revenue}  />**/}
                    <BreakdownEarningsCustomerAreaChart />
                </Suspense>

                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    )
}