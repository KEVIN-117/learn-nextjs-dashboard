import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Card } from "@tremor/react";
import { signOut } from '@/auth'
import { redirect } from "next/navigation";
import {ThemeHandler} from "@/app/ui/button";

export default function SideNav() {


  return (
    <Card decoration="right" decorationColor="indigo" className="flex gap-2 h-full flex-col px-3 py-4 md:px-2">
                <div className="mb-2 flex flex-col h-auto items-center justify-between rounded-md bg-blue-600  p-4 md:h-auto">
                    <ThemeHandler />
                    <Link className="w-32 h-auto text-white md:w-40" href="/">
                        <AcmeLogo />
                    </Link>
                </div>
                <div className="flex flex-1  flex-row  space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                    <NavLinks />
                </div>
                <div>
                    <form action={async ()=>{
                        'use server'
                        await signOut()
                        redirect('/')
                    }}>
                        <button className="flex h-[48px] justify-center items-center w-full grow gap-2 font-medium md:flex-none md:justify-start md:p-2 md:px-3
                            tremor-Callout-root rounded-tremor-default text-tremor-default bg-red-700 border-red-700
                            text-red-700 dark:bg-opacity-10 bg-opacity-10 border-4"
                        >
                            <PowerIcon className="w-6" />
                            <div className="hidden md:block text-center">Sign Out</div>
                        </button>
                    </form>
                </div>
    </Card>
  );
}
