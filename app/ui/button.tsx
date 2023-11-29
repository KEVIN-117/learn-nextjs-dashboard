"use client";
import clsx from 'clsx';
import {useContext, ReactNode, ButtonHTMLAttributes} from "react";
import {ThemeContext} from "@/app/context/ThemeProvider";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}


export function ThemeHandler(){
  const { icon, handleTheme } = useContext(ThemeContext)
  return(
      <button onClick={handleTheme} className="">
        {icon}
      </button>
  )
}