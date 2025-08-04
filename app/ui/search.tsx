'use client';
import { ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback  } from 'use-debounce'
import {TextInput} from "@tremor/react";
export default function Search({ placeholder }: { placeholder: string }) {
    const  searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()
    const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams)
        if (value){
            params.set('query', value)
        }else {
            params.delete('query')
        }
        params.set('page', '1')
        replace(`${pathName}?${params.toString()}`)
    }, 3000)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <TextInput
        className="peer block w-full rounded-md border border-gray-200 outline-0 py-[9px] pl-10 text-sm placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
