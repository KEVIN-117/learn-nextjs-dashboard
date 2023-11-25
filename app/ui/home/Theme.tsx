"use client"
import { ThemeContext } from '@/app/context/ThemeProvider'
import {useContext, useState} from 'react'
import {Moon} from "@/app/ui/icons/Moon";
import {Sun} from "@/app/ui/icons/Sun";
export function Theme(){
    const { setTheme, currentTheme } = useContext(ThemeContext)
    const [icon, setIcon] = useState(currentTheme!!!=='light' ? <Moon /> : <Sun />)
    const handleTheme = () => {
        if (currentTheme === 'light'){
            setTheme('dark')
            setIcon(<Sun/>)
            localStorage.setItem('theme', 'dark')
        }else {
            setTheme('light')
            setIcon(<Moon/>)
            localStorage.setItem('theme', 'light')
        }
    }
    return(
        <>
            <button onClick={handleTheme} className="">
                {icon}
            </button>
        </>
    )
}