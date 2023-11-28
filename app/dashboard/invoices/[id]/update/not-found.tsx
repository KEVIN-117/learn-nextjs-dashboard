"use client";
import { NotFound as Found } from "@/app/ui/icons/NotFound";
import Link from "next/link";

export default function NotFound() {
    return(
        <main className='flex h-auto flex-col items-center justify-center'>
            <div className='flex flex-col justify-center items-center bg-dark-tremor-background-main text-tremor-background-emphasis dark:text-tremor-background-emphasis'>
                <Found width={800} height={800}/>
                <Link href={'/dashboard/invoices'} className='px-3 py-3 bg-dark-tremor-background-subtle text-tremor-background rounded-xl'>
                    Go Back
                </Link>
            </div>
        </main>

    )
}