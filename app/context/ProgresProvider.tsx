'use client'
import {ReactNode} from "react";
import { AppProgressBar } from 'next-nprogress-bar';
export default function ProgressBar({children}:{children:ReactNode}){
    return(
        <>
            <AppProgressBar
                color="#29D"
                options={{ easing: 'ease', speed: 500 }}
            />
            {children}
        </>
    )
}