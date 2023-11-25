"use client";
import { createContext, useState, ReactNode, useEffect } from 'react'

export const ThemeContext = createContext({currentTheme:'light', setTheme: (theme: string) => {}}  )
export function ThemeProvider({ children }:{children:ReactNode} ){
    const [currentTheme, setTheme] = useState('light')

    useEffect(() => {
        const currentThemeName = localStorage.getItem('theme')
        setTheme(currentThemeName!!!)
    }, []);

    const value = {currentTheme, setTheme}
    return(
        <ThemeContext.Provider value={value}>
            <div className={`${currentTheme} h-auto`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}