import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const CardCategory = ({category, size}) => {

    return (
        <motion.div layout animate={{opacity: 1, y: 0}} initial={{opacity: 0, y: 20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}}   className={`flex flex-col items-center justify-center w-full ${size === '1/4' ? 'md:w-1/4' : 'md:w-1/2'} p-10`}>
            <Link href={`/prodotto/${category.slug}`} className='relative w-full shadow drop-shadow-2xl border-custom-first-color'>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.image.data.attributes.url}`} alt={category.name} width={size === '1/4' ? 400 : 800} height={size === '1/4' ? 400 : 800} />
            </Link>
            <Link href={`/prodotto/${category.slug}`} className='text-center'>
                <h3 className='capitalize text-base'>{category.description}</h3>
                {!category.prezzo_senza_sconto && <span className='font-bold text-lg'>{category.price}€</span>}
                {category.prezzo_senza_sconto && <div className='flex items-center justify-center'>
                    <span className='line-through font-bold text-lg'>{category.prezzo_senza_sconto}€</span>
                    <span className='ml-2 font-bold text-lg'>{category.price}€</span>
                </div>}
            </Link>
        </motion.div>
    );
}

export default CardCategory;