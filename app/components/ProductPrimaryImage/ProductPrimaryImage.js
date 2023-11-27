import Image from "next/image";
export default function ProductPrimaryImage({image, name}) {
    return (
        <div className='w-full md:w-1/2'>
            { image.includes('.mp4')
            ? <video style={{width: 400, height: 300}} autoPlay muted loop><source src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`} type="video/mp4" /></video>
            : <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`} alt={name} width={400} height={300} priority={true} /> }
        </div>
    );
}