"use client";

import Image from "next/image";

export default function ProductPrimaryImage({image, name}) {
    return (
        <div className='w-full md:w-1/2'>
            <Image src={image} alt={name} width={400} height={300}/>
        </div>
    );
}