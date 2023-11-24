"use client";
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import {useContext, useState} from  'react'
import { Card } from "@tremor/react";
import { RouterContext } from '@/app/context/Routercontext'
import { ThemeContext } from '@/app/context/ThemeProvider'
import { Sun } from '@/app/ui/icons/Sun'
import { Moon } from '@/app/ui/icons/Moon'

export default function SideNav() {
    const {setPath} = useContext(RouterContext)

    const { setTheme, currentTheme } = useContext(ThemeContext)
    const [icon, setIcon] = useState(currentTheme!!!=='light' ? <Moon /> : <Sun />)
    const handlePath = (path: string) => {
        setPath(path)
    }

    const handleTheme = () => {
        if (currentTheme === 'light'){
            setTheme('dark')
            setIcon(<Sun/>)
        }else {
            setTheme('light')
            setIcon(<Moon/>)
        }
    }
  return (
    <Card decoration="right" decorationColor="indigo" className="flex h-full flex-col px-3 py-4 md:px-2">

      <div
        className="mb-2 flex flex-col h-20 items-center justify-between rounded-md bg-blue-600  p-4 md:h-40"

      >
          <button onClick={handleTheme} className="">
              {icon}
          </button>
        <Link className="w-32 text-white md:w-40" href="/">
          <AcmeLogo />
        </Link>
      </div>
      <div className="flex flex-1  flex-row  space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks setPath={setPath} />
      </div>
        <div>
            <form>
                <button className="flex h-[48px] justify-center items-center w-full grow gap-2 font-medium md:flex-none md:justify-start md:p-2 md:px-3
                tremor-Callout-root rounded-tremor-default text-tremor-default bg-red-700 border-red-700
                text-red-700 dark:bg-opacity-10 bg-opacity-10 border-4">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block text-center">Sign Out</div>
                </button>
            </form>
        </div>
    </Card>
  );
}
