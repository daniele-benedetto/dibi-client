import Image from "next/image";
export default function ProductSingleImage({image, name, idx, handleClick}) {
    return (
        <div onClick={() => handleClick(idx)} className={'w-1/4 md:w-1/2 md:p-5'}>
            { image.includes('.mp4') 
            ? <video className={'w-full'} autoPlay muted loop><source src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`} type="video/mp4" /></video> 
            : <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`} alt={name} width={500} height={500} /> }
        </div>
    );
}