"use client";
import { NotFound as Found } from "@/app/ui/icons/NotFound";
import Link from "next/link";

export default function NotFound() {
    return(
        <div className='flex flex-col py-4 px-1 justify-center items-center h-screen bg-dark-tremor-background-main text-tremor-background-emphasis dark:text-tremor-background-emphasis'>
            <Found/>
            <Link href={'/'} className='px-3 py-3 bg-dark-tremor-background-subtle text-tremor-background rounded-xl'>
                back to home
            </Link>
        </div>
    )
}