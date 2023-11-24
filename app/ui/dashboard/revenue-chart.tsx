
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data'
import { BarChart, Card, Title } from '@tremor/react'

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/
export default async function RevenueChart() {
    const revenue = await fetchRevenue()
    const  data = revenue.map((r) => ({ date: r.month, revenue: r.revenue }))

  if (!revenue || revenue.length === 0) {
     return <p className="mt-4 text-gray-400">No data available.</p>;
  }
    const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="rounded-xl bg-opacity-0 border border-opacity-25 backdrop-filter backdrop-blur-[17px] backdrop-saturate-200 text-tremor-background-emphasis dark:text-tremor-background p-4">
          <Card className='card-glass'>
              <Title>Recent Revenue Analysis</Title>
              <BarChart
                  className="mt-6"
                  data={data}
                  index="date"
                  categories={["revenue"]}
                  colors={["blue"]}
                  yAxisWidth={48}
              />
          </Card>
            <div className="flex items-center pb-2 pt-6">
              <CalendarIcon className="h-5 w-5" />
              <h3 className="ml-2 text-sm ">Last 12 months</h3>
            </div>
      </div>
    </div>
  );
}
