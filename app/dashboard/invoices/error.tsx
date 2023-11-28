"use client";
import { useEffect, useState } from 'react'

export default function Error({error, reset }:{error: Error & { digest?: string }; reset: () => void}){
    const [errorInfo, setErrorInfo] = useState(error);
    useEffect(() => {
        setErrorInfo(error)
    }, [error]);
    return (
        <main className="flex flex-col items-center justify-center">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-4 md:p-5 text-center">
                        <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {errorInfo?.message}
                        </h3>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                            onClick={
                                () => reset()
                            }
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
/*
<main className="absolute flex flex-col items-center justify-center bg-red-600 top-0 left-0 right-0 bottom-0">
            <h2 className="text-center">Something went wrong!</h2>
            <p className="text-center">
                {errorInfo?.message}
            </p>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
 */