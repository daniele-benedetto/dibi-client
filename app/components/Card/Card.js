"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Card({product}) {

    const [visible, setVisible] = useState(false);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        if(product) {
            setVisible(product.empty_visible);
            setStock(product.stock);
        }
    }, []);

    if(stock > 0) return (
        <article className='w-1/2 md:w-1/3 lg:w-1/3 p-2'>
            <Link href={`prodotto/${product.slug}`}>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image.data.attributes.url}`} alt="product image" width={350} height={425} />
                <h3 className='text-sm uppercase leading-3 mt-3'>{product.name}</h3>
                {product.prezzo_senza_sconto ? (
                    <div className='flex items-center'>
                        <span className='text-xs font-bold line-through text-red-700'>{product.prezzo_senza_sconto.toFixed(2)}€</span>
                        <span className='text-xs font-bold ml-2'>{(product.price).toFixed(2)}€</span>
                    </div>
                ) : (
                <span className='text-xs font-bold'>{product.price.toFixed(2)}€</span>
                )}
            </Link>
        </article>
    );

    if(visible && stock === 0) return (
        <article className='w-1/2 md:w-1/3 lg:w-1/3 p-2 relative'>
            <Link href={`prodotto/${product.slug}`}>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image.data.attributes.url}`} alt="product image" width={350} height={425} />
                <h3 className='text-sm uppercase leading-3'>{product.name}</h3>
                <span className='text-xs font-bold'>{product.price.toFixed(2)}€</span>
                <div className='absolute top-1/3 left-0 w-full bg-red-600  flex justify-center items-centes -rotate-45'>
                    <span className='text-white font-bold text-2xl'>Esaurito</span>
                </div>
            </Link>
        </article>
    );

    return null;
}
