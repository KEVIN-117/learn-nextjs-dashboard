'use server';
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.number(),
    status: z.enum(['paid', 'pending']),
    date: z.string(),
})


const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true })
const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true })
export async function createInvoice(formData: FormData){
    const { customerId, amount, status } = CreateInvoiceSchema.parse({
        customerId: formData.get('customerId'),
        amount: Number(formData.get('amount')),
        status: formData.get('status'),
    })
    const amountInCent = amount * 100
    const date = new Date().toISOString().split('T')[0]
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCent}, ${status}, ${date})
    `
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function updateInvoice(id: string, formData: FormData){
    const { customerId, amount, status } = UpdateInvoiceSchema.parse({
        customerId: formData.get('customerId'),
        amount: Number(formData.get('amount')),
        status: formData.get('status'),
    })
    const amountInCent = amount * 100

    await sql `
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCent}, status = ${status}
        WHERE id  =${id}
    `
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string){
    await sql `
        DELETE from invoices
        WHERE id = ${id}
    `
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}