import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import {Card} from "@tremor/react";

import {Metadata} from 'next'
export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {
    return(
        <main className="flex items-center justify-center h-screen bg-dark-tremor-background-main px-4">
            <Card className="relative mx-auto flex glass justify-center items-center w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-auto w-full justify-center items-center rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <LoginForm/>
            </Card>
        </main>
    )
}