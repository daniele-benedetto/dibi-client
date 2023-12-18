import Image from "next/image";
export default function ProductPrimaryImage({image, name, onClick}) {
    return (
        <div className='w-full md:w-1/2' onClick={onClick}>
            { image.includes('.mp4')
            ? <video style={{width: 800, height: 600}} autoPlay muted loop><source src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`} type="video/mp4" /></video>
            : <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`} alt={name} width={800} height={600} priority={true} /> }
        </div>
    );
}