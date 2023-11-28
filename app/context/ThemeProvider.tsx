"use client";
import { createContext, useState, ReactNode, useEffect } from 'react'
import {Sun} from "@/app/ui/icons/Sun";
import {Moon} from "@/app/ui/icons/Moon";

export const ThemeContext = createContext({
        currentTheme:'light',
        setTheme: (theme: string) => {},
        icon: <Sun/>,
        handleTheme: () => {}
})
export function ThemeProvider({ children }:{children:ReactNode} ){
    const [currentTheme, setTheme] = useState('light')
    const [icon, setIcon] = useState(currentTheme!!!=='light' ? <Moon /> : <Sun />)


    useEffect(() => {
        const currentThemeName = localStorage.getItem('theme')
        setTheme(currentThemeName!!!)
    }, []);

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

    const value = {currentTheme, setTheme, handleTheme, icon, setIcon}
    return(
        <ThemeContext.Provider value={value}>
            <div className={`${currentTheme} h-auto  delay-700`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}