"use client";
import Link from 'next/link';
import {
  CameraIcon,
  UserCircleIcon,
    CogIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { Card } from "@tremor/react";
import { createCustomer } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { useState, ChangeEvent } from 'react'

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);
  const [image, setImage] = useState<any>(null)
  const [file, setFile] = useState<any>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement
    console.log(element.files![0])
    const image = element.files![0]
    setFile(image)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', e.currentTarget.name)
    formData.append('email', e.currentTarget.email.value)
    formData.append('image', file)
    await dispatch;
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-md flex flex-col md:h-screen h-auto bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Your Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="alguien"
                  aria-describedby="amount-currency-error"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-gray-50 text-gray-900 p-2.5 dark:bg-gray-700 dark:text-white"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id='customer-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.name &&
            state.errors?.name.map((error)=> (
                <p key={error} className='mt-2 text-sm text-red-500'>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Your email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="alguien@gmail.com"
                aria-describedby="amount-currency-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-gray-50 text-gray-900 p-2.5 dark:bg-gray-700 dark:text-white"
              />
              <CogIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-currency-error">
            {state.errors?.email &&
            state.errors?.email.map((error) => (
                <p key={error} className='mt-2 text-sm text-red-500'>{error}</p>
            ))}
          </div>
        </div>

        {/* Customer Image */}
        <div className="mb-4 w-[50%] h-screen mx-auto">
          <label htmlFor="image" className="flex items-center md:h-full h-48 rounded-md  mx-auto justify-center border-2 border-gray-300 border-dashed
          cursor-pointer bg-gray-50
          dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            style={{
              backgroundImage: `url(${file ? URL.createObjectURL(file) : ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {!file && (<CameraIcon className="pointer-events-none left-3  md:w-32 h-32  text-gray-500 peer-focus:text-gray-900" />)}
            <input
                onChange={handleChange}
                id="image"
                name="image"
                type="file"
                aria-describedby="amount-currency-error"
                className="hidden"
            />
          </label>
          <div id="amount-currency-error">
            {state.errors?.image &&
                state.errors?.image.map((error) => (
                    <p key={error} className='mt-2 text-sm text-red-500'>{error}</p>
                ))}
          </div>
        </div>
        {state.message && <p className='mt-2 text-red-500' >{state.message}</p>}
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
