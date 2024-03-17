import {fetchCustomersData} from "@/app/lib/data";
import Image from "next/image";
import myImageLoader from "@/scripts/Loader";

export async function Carousel(){
    const response = await fetchCustomersData()

    return(
        <div>
            {response.map((customer) => (
                <div key={customer.id}>
                    <h1>{customer.name}</h1>
                    <Image src={customer.image_url}
                           alt={customer.name}
                           width={500}
                           height={500}
                           loader={myImageLoader}
                    />
                </div>
            ))}
        </div>
    )
}