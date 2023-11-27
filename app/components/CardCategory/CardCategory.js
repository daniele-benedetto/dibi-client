import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const CardCategory = ({category, size}) => {

    return (
        <motion.div layout animate={{opacity: 1, y: 0}} initial={{opacity: 0, y: 20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}}   className={`flex flex-col items-center justify-center w-full ${size === '1/4' ? 'md:w-1/4' : 'md:w-1/2'} p-10`}>
            <Link href={`/prodotto/${category.slug}`} className='relative w-full shadow drop-shadow-2xl border-custom-first-color'>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.image.data.attributes.url}`} alt={category.name} width={size === '1/4' ? 400 : 800} height={size === '1/4' ? 400 : 800} priority={true} />
            </Link>
            <Link href={`/prodotto/${category.slug}`} className='text-center font-bold'>
                <h3 className='capitalize'>{category.name}</h3>
            </Link>
        </motion.div>
    );
}

export default CardCategory;