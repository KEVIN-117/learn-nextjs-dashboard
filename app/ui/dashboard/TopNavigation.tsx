"use client";
import { useContext } from 'react'
import { RouterContext } from '@/app/context/Routercontext'
import Link from "next/link";
import {v4 as id} from 'uuid'
import {BadgeDelta} from "@tremor/react";
export function TopNavigation(){
    const {path} = useContext(RouterContext)
    return(
        <BadgeDelta deltaType="increase" isIncreasePositive={true} size="lg">
            {path}
        </BadgeDelta>
    )
}