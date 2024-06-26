import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/customers/create-form";

export default function Page() {
    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Customers', href: '/dashboard/customers'},
                    {
                        label: 'Create',
                        href: '/dashboard/customers/create',
                        active: true
                    }
                ]}
            />
            <Form />
        </main>
    )
}