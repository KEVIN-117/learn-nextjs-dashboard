"use client";
import { createContext, useState, ReactNode } from 'react'

export const ThemeContext = createContext({currentTheme:'light', setTheme: (theme: string) => {}}  )
export function ThemeProvider({ children }:{children:ReactNode} ){
    const [currentTheme, setTheme] = useState('light')

    const value = {currentTheme, setTheme}
    return(
        <ThemeContext.Provider value={value}>
            <div className={currentTheme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}