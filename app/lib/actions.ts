'use server';
import {undefined, z} from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { State } from './definitions'
import { signIn } from '@/auth'

const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer',
    }),
    amount: z.number().gt(0, {message: 'Please enter an amount greater than $0.'}),
    status: z.enum(['paid', 'pending'],{
        invalid_type_error: 'Please select a status',
    }),
    date: z.string(),
})


const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true })
const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true })
export async function createInvoice(prevState:State, formData: FormData){
    const validateFields = CreateInvoiceSchema.safeParse({
        customerId: formData.get('customerId'),
        amount: Number(formData.get('amount')),
        status: formData.get('status'),
    })
    if (!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create invoice.',
        }
    }
    const { customerId, amount, status } = validateFields.data
    const amountInCent = amount * 100
    const date = new Date().toISOString().split('T')[0]
    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCent}, ${status}, ${date})
        `

    }catch (e: any) {
        return {error: e instanceof z.ZodError ? e.issues : [{ path: ['unknown'], message: e.message }]}

    }
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function updateInvoice(id: string, prevState: State, formData: FormData){
    const validateFields = UpdateInvoiceSchema.safeParse({
        customerId: formData.get('customerId'),
        amount: Number(formData.get('amount')),
        status: formData.get('status'),
    })
    if (!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Incorrect data in Fields. Failed to update invoice.',
        }
    }
    const {customerId, amount, status} = validateFields.data
    const amountInCent = amount * 100
    try {
        await sql `
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCent}, status = ${status}
        WHERE id  =${id}
    `
    }catch (e: any) {
        return {error: e instanceof z.ZodError ? e.issues : [{ path: ['unknown'], message: e.message }]}
    }
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string){
    try {
        await sql `
        DELETE from invoices
        WHERE id = ${id}
    `
    }catch (e: any) {
        return {error: e instanceof z.ZodError ? e.issues : [{ path: ['unknown'], message: e.message }]}
    }
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialsSignin';
        }
        throw error;
    }
}