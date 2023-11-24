"use client";
import {createContext, useState, ReactNode} from 'react'


export const RouterContext = createContext({path: '/', setPath: (path: string) => {}})

export function RouterProvider({children}: {children: ReactNode}){
    const [path, setPath] = useState('/')
    const value = {path, setPath}
    return (
        <RouterContext.Provider value={value}>
            {children}
        </RouterContext.Provider>
    )
}