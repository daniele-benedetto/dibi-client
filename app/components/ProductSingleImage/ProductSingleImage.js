import Image from "next/image";
import { useEffect } from "react";

export default function ProductSingleImage({image, name, idx, handleClick}) {
            
    return (
        <div onClick={() => handleClick(idx)} className={'w-1/4 md:w-1/2 md:p-5'}>
            { image.includes('.mp4') 
            ? <video className={'w-full'} autoPlay muted loop><source src={image} type="video/mp4" /></video> 
            : <Image src={image} alt={name} width={500} height={500} /> }
        </div>
    );
}