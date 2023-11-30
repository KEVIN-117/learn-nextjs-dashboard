import {Metadata} from "next";
import {Suspense} from "react";
import {lusitana} from "@/app/ui/fonts";
import CustomersTable from "@/app/ui/customers/table";
import {fetchCustomerPages} from '@/app/lib/data'
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { CreateCustomer } from "@/app/ui/customers/buttons";
export const metadata: Metadata = {
    title: 'Customers',
}
export default async function Page({searchParams}:{searchParams?:{query?: string, page?:number}}){
    const currentPage = Number(searchParams?.page!) || 1
    const query = searchParams?.query || ''
    const totalPages = await fetchCustomerPages(query)
    return(
        <main className='w-full'>
            <div className='flex w-full items-center justify-center mb-6'>
                <h1 className={`${lusitana.className} text-2xl`}>
                    Customers
                </h1>
            </div>
            {/*<Container/>*/}
            <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                <Search placeholder="Search customers..." />
                <CreateCustomer />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <CustomersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    )
}