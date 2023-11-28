"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from "next/link";
import { RouterContext } from '@/app/context/Routercontext'
import{ usePathname } from 'next/navigation'
import { useContext } from 'react'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname()
  const {setPath} = useContext(RouterContext)
  const handlePath = (path: string) => {
    setPath(path)
  }
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
              onClick={() => handlePath(link.href)}
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-dark-tremor-background-muted p-3 
             font-medium md:flex-none md:justify-start md:p-2 md:px-3 text-tremor-default border-[.5px]
            ${pathname === link.href ? 'tremor-Callout-root bg-teal-500 border-teal-700 text-teal-700 font-bold dark:bg-opacity-10 bg-opacity-10 border-l-4 cursor-none' : 
                'dark:text-tremor-background-muted tremor-Callout-root rounded-tremor-default text-tremor-default ' +
                'bg-indigo-500 border-indigo-700 text-indigo-700 dark:bg-opacity-10 bg-opacity-10 border-l-4'}`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
