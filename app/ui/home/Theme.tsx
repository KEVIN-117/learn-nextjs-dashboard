"use client"
import { ThemeContext } from '@/app/context/ThemeProvider'
import { useState} from 'react'
import {Moon} from "@/app/ui/icons/Moon";
import {Sun} from "@/app/ui/icons/Sun";
export function Theme({children}:{children: React.ReactNode}) {
    const [ currentTheme, setTheme ] = useState('light')
    const [icon, setIcon] = useState(currentTheme!!!=='light' ? <Moon /> : <Sun />)
    const handleTheme = () => {
        if (currentTheme === 'light'){
            setTheme('dark')
            setIcon(<Sun/>)
            localStorage.setItem('homeTheme', 'dark')
        }else {
            setTheme('light')
            setIcon(<Moon/>)
            localStorage.setItem('homeTheme', 'light')
        }
    }
    return(
            <div className={`${currentTheme} dark:bg-dark-tremor-background-main`}>
                <button onClick={handleTheme} className="flex w-full dark:bg-dark-tremor-background-main">
                    {icon}
                </button>
                {children}
            </div>
    )
}