import Image from "next/image";
import Link from "next/link";

export default function SearchItem({item, action}) {
    return(
        <Link onClick={action} href={`prodotto/${item.attributes.slug}`} className="flex justify-between items-center w-full h-20 border-b border-gray-200">
            <div className="flex items-center">
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.attributes.image.data.attributes.url}`} alt="product image" width={60} height={100} />
                <div className="flex flex-col justify-between items-start ml-4">
                    <h5 className="text-lg font-bold">{item.attributes.name}</h5>
                </div>
            </div>
        </Link>
    );
}