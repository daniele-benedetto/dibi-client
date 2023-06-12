"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Card({product}) {

    const [visible, setVisible] = useState(false);
    const [stock, setStock] = useState(0);
    const [sale, setSale] = useState(0);

    useEffect(() => {
        if(product) {
            
            let magazzino = 0;
            let categorySale = 0;
            let subCategorySale = 0;
            let productSale = 0;

            setVisible(product.empty_visible);

            console.log(product)

            product.product_variant.map((variant) => {
                magazzino += variant.stock;
                setStock(magazzino);
            });

            if(product.category.data.attributes.sale?.data) {
                categorySale = product.category.data.attributes.sale?.data.attributes.amount;
            }

            if(product.subcategory.data.attributes.sale?.data) {
                subCategorySale = product.subcategory.data.attributes.sale?.data.attributes.amount;
            }

            if(product.sale?.data) {
                productSale = product.sale?.data.attributes.amount;
            }

            setSale(Math.max(categorySale, subCategorySale, productSale));
        }
    }, []);

    if(stock > 0) return (
        <article className='w-1/2 md:w-1/3 lg:w-1/3 p-2'>
            <Link href={`prodotto/${product.slug}`}>
                <Image src={product.image.data.attributes.url} alt="product image" width={350} height={425} />
                <h3 className='text-sm uppercase leading-3 mt-3'>{product.name}</h3>
                {sale > 0 ? (
                    <div className='flex items-center'>
                        <span className='text-xs font-bold line-through text-red-700'>{product.price.toFixed(2)}€</span>
                        <span className='text-xs font-bold ml-2'>{(product.price - sale).toFixed(2)}€</span>
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
                <Image src={product.image.data.attributes.url} alt="product image" width={350} height={425} />
                <h3 className='text-sm uppercase leading-3'>{product.name}</h3>
                <span className='text-xs font-bold'>{product.price.toFixed(2)}€</span>
                <div className='absolute top-1/2 left-0 w-full bg-red-600  flex justify-center items-centes -rotate-45'>
                    <span className='text-white font-bold text-2xl'>Esaurito</span>
                </div>
            </Link>
        </article>
    );

    return null;
}
