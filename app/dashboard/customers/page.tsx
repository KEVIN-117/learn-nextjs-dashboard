import DashboardSkeleton from "@/app/ui/skeletons";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
export default function Page(){
    return(
        <>
            <p>Customers Page</p>
            <DashboardSkeleton/>
            <InvoicesTableSkeleton/>
        </>
    )
}