import {ReactNode} from 'react'
import SideNav from '@/app/ui/dashboard/sidenav'
import { RouterProvider } from '@/app/context/Routercontext'
import {TopNavigation} from "@/app/ui/dashboard/TopNavigation";
import {ThemeProvider} from "@/app/context/ThemeProvider";
export default function Layout({children}: {children: ReactNode}){

    return(
        <ThemeProvider>
            <RouterProvider>
                <div className='flex dark:bg-dark-tremor-background-main bg-tremor-background h-screen flex-col md:flex-row md:overflow-hidden text-tremor-background-emphasis dark:text-tremor-background'>
                    <div className='w-full flex-none md:w-64'>
                        <SideNav />
                    </div>
                    <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
                        <TopNavigation />
                        {children}
                    </div>
                </div>
            </RouterProvider>
        </ThemeProvider>

    )
}