import { Inter, Lusitana, Goldman } from 'next/font/google'
import {NextFont} from "next/dist/compiled/@next/font";

export const inter: NextFont = Inter({subsets:['latin']})
export const lusitana: NextFont = Goldman({
    subsets:['latin'],
    weight:['400','400']
})