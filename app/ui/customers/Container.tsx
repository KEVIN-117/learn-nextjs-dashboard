import Image from "next/image";
import {CustomerCard} from "@/app/ui/customers/CustomerCard";

export function Container(){
    return (
        <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden w-full flex justify-center items-center gap-3 flex-wrap rounded-md md:pt-0">
                        <CustomerCard/>
                        <CustomerCard/>
                        <CustomerCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}