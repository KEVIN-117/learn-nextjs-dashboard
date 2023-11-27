import {fetchBreakdownEarningsCustomer} from "@/app/lib/data";
import {formatCurrency, combineData} from "@/app/lib/utils";
import {lusitana} from "@/app/ui/fonts";
import {AreaChart, Card, Title} from "@tremor/react";
import {CalendarIcon} from "@heroicons/react/24/outline";

export default async function BreakdownEarningsCustomerAreaChart() {
    const { dataPaid, dataPending, dataFull } = await fetchBreakdownEarningsCustomer()

    const fullData = dataFull.map((r) => ({
        name: r.customersname,
        amount: formatCurrency(Number(r.totalamount)),
        totalCurrency: Number(r.totalamount),
        amountPaid: 0,
        amountPending: 0,
        paid: 0,
        pending: 0
    }));
    const paidData = dataPaid.map((r) => ({
        name: r.customersname,
        amountPaid: formatCurrency(Number(r.totalamount)),
        paid: Number(r.totalamount),
        totalCurrency: 0,
        amount: 0,
        amountPending: 0,
        pending: 0
    }))
    const pendingData = dataPending.map((r) => ({
        name: r.customersname,
        amountPending: formatCurrency(Number(r.totalamount)),
        pending: Number(r.totalamount),
        totalCurrency: 0,
        amount: 0,
        amountPaid: 0,
        paid: 0
    }))

    const data = combineData(dataFull, dataPaid, dataPending);

    if (!dataFull || dataFull.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Ganancias por Cliente
            </h2>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <div className="rounded-xl bg-opacity-0 border border-opacity-25 backdrop-filter backdrop-blur-[17px] backdrop-saturate-200 text-tremor-background-emphasis dark:text-tremor-background p-4">
                <Card className='card-glass'>
                    <Title>Desglose de Ganancias por Cliente</Title>
                    <AreaChart
                        className="mt-6"
                        data={data}
                        index="name"
                        showAnimation={true}
                        animationDuration={2000}
                        showGridLines={true}
                        showYAxis={true}
                        color={"red"}
                        categories={['totalCurrency', "paid", "pending",]}
                        colors={["blue", "green", "red"]}
                        yAxisWidth={50}
                        rotateLabelX={{xAxisHeight: 100, angle: -45, verticalShift: 30}}
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