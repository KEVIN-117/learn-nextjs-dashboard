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
import {lusitana} from "@/app/ui/fonts";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomer, initialState);
  const [file, setFile] = useState<any>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement
    console.log(element.files![0])
    const image = element.files![0]
    setFile(image)
  }


  return (
    <form action={dispatch}>
      <Card className="rounded-md flex md:flex-row flex-col md:h-screen h-auto bg-gray-50 p-4 md:p-6 gap-5">
        <div className={"w-[40%] h-full"}>
          {/* Customer Image */}
          <div className="mb-4 h-full">
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
              {!file && (<CameraIcon
                  className="pointer-events-none left-3  md:w-32 h-32  text-gray-500 peer-focus:text-gray-900"/>)}
              <input
                  onChange={handleChange}
                  id="image"
                  name="image"
                  type="file"
                  aria-describedby="image-profile-error"
                  className="hidden"
              />
            </label>
            <div id="image-profile-error">
              {state.errors?.image &&
                  state.errors?.image.map((error) => (
                      <p key={error} className='mt-2 text-sm text-red-500'>{error}</p>
                  ))}
            </div>
          </div>
          {state.message && <p className='mt-2 text-red-500'>{state.message}</p>}
        </div>
        <Card className={"flex-1"}>
          <Card className='flex w-full items-center justify-center mb-6'>
            <h1 className={`${lusitana.className} text-4xl`}>
              Create a new customer
            </h1>
          </Card>
          {/* Customer Name */}
          <Card className="mb-4">
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
                <UserCircleIcon
                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
              </div>
            </div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.name &&
                  state.errors?.name.map((error) => (
                      <p key={error} className='mt-2 text-sm text-red-500'>
                        {error}
                      </p>
                  ))}
            </div>
          </Card>

          {/* Customer Email */}
          <Card className="mb-4">
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
                <CogIcon
                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
              </div>
            </div>
            <div id="amount-currency-error">
              {state.errors?.email &&
                  state.errors?.email.map((error) => (
                      <p key={error} className='mt-2 text-sm text-red-500'>{error}</p>
                  ))}
            </div>
          </Card>
          <Card className="mt-6 flex justify-end gap-4">
            <Link
                href="/dashboard/customers"
                className="flex w-full py-5 items-center rounded-lg bg-red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Cancel
            </Link>
            <Button className={"flex w-full py-5 items-center rounded-lg bg-blue-700 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600"} type="submit">Create Invoice</Button>
          </Card>
        </Card>
      </Card>
    </form>
  );
}
