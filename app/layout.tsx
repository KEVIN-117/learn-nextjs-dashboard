import '@/app/ui/global.css'

import { inter } from '@/app/ui/fonts'
import { RouterProvider } from '@/app/context/Routercontext'
import { ThemeProvider } from '@/app/context/ThemeProvider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RouterProvider>
        <body className={`${inter.className} antialiased text-tremor-background-emphasis dark:text-tremor-background-emphasis`}>
          <ThemeProvider >
            {children}
          </ThemeProvider>
        </body>
      </RouterProvider>
    </html>
  );
}
