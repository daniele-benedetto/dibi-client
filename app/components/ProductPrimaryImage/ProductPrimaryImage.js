"use client";

import Image from "next/image";

export default function ProductPrimaryImage({image, name}) {
    return (
        <div className='w-full md:w-1/2'>
            { image.includes('.mp4')
            ? <video style={{width: 400, height: 300}} autoPlay muted loop><source src={image} type="video/mp4" /></video>
            : <Image src={image} alt={name} width={400} height={300} /> }
        </div>
    );
}