import Image from "next/image";

export default function ProductSingleImage({image, name, idx, handleClick}) {
    return (
        <div onClick={() => handleClick(idx)} className={'w-1/4 md:w-1/2 md:p-5'}>
            <Image src={image} alt={name} width={400} height={300} priority />
        </div>
    );
}