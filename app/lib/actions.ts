'use server';
import {undefined, z} from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {CustomerState, State} from './definitions'


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


const CustomerSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter a name',
    }),
    email: z.string({
        invalid_type_error: 'Please enter an email',
    }),
    image: z.string({
        invalid_type_error: 'Please enter an image file',
    })
})

const CreateCustomerSchema = CustomerSchema.omit({ id: true })

export async function createCustomer(prevState:CustomerState, formData: FormData){
    console.log("create customer")
    console.log(formData.get('name'))
    console.log(formData.get('email'))
    console.log(formData.get('image'))
    const validateFields = CreateCustomerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        image: formData.get('image')
    })
    if (!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create invoice.',
        }
    }
    const { name, email, image } = validateFields.data
    //const image_url = await uploader(image).then((data: any) => data.url)
    try {
        /*await sql`
            INSERT INTO customers (name, email, image_url)
            VALUES (${name}, ${email}, ${image_url})
        `*/
        console.log(name, email, image)

    }catch (e: any) {
        return {error: e instanceof z.ZodError ? e.issues : [{ path: ['unknown'], message: e.message }]}
    }
    revalidatePath('/dashboard/customers')
    redirect('/dashboard/customers')
}

const uploader = async (file: any)=>{
    const formData = new FormData()
    formData.append('image', file)
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    const data = await response.json()
    console.log("data image upload " + data.url)
    formData.append('image', data.url)
}