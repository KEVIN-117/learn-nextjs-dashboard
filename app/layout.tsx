import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { RouterProvider } from '@/app/context/Routercontext'
import ProgressBar from "@/app/context/ProgresProvider";
import { Metadata } from 'next'
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: {
        template: '%s | SellWise Dashboard',
        default: 'Acme Dashboard',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
    icons: {
        icon: '/favicon.ico',
    },
};
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <RouterProvider>
          <body className={`${inter.className} antialiased bg-white dark:bg-dark-tremor-background-main text-tremor-background-emphasis dark:text-tremor-background-emphasis`}>
              <ProgressBar>
                  {children}
              </ProgressBar>
          </body>
      </RouterProvider>
    </html>
  );
}
