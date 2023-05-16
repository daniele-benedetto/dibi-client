import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const WishItem = ({item}) => {
    return (
        <div className="flex justify-between items-center w-full h-26 border-b border-gray-200 relative">
            <Link href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/prodotto/${item.slug}`} className="flex items-center mb-5">
                <Image src={item.image.url} alt="product image" width={80} height={100} />
                <div className="flex flex-col justify-between items-start ml-4">
                    <h5 className="text-lg font-bold">{item.name}</h5>
                </div>
            </Link>
            <AiOutlineClose size={16} className='absolute top-0 right-0' />
        </div>
    );
}

export default WishItem;