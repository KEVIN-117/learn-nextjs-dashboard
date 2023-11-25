import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { RouterProvider } from '@/app/context/Routercontext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RouterProvider>
        <body className={`${inter.className} antialiased text-tremor-background-emphasis dark:text-tremor-background-emphasis`}>
          {children}
        </body>
      </RouterProvider>
    </html>
  );
}
