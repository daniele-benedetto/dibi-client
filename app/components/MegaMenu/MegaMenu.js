"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MegaMenu = ({categories}) => {
    return (
        <motion.div 
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            transition={{ease: 'linear', duration: 0.5}}
            className="absolute bottom-0 left-1/2 w-full max-w-7xl bg-white z-10 p-10 shadow -translate-x-1/2 translate-y-full flex flex-wrap justify-around"
        >
            {categories.map((category, idx) => {
                return (
                    <div key={idx} className="flex flex-col text-center justify-center items-center w-1/6">
                        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.image.data.attributes.url}`} alt={category.attributes.name} width={180} height={180} />
                        <h4 className="text-xl font-bold mt-2 mb-2 itemMenuCategory second-color">
                            <Link href={`/categoria/${category.attributes.slug}`}>{category.attributes.name}</Link>
                        </h4>
                        <ul className="flex flex-col">
                            {category.attributes.subcategories.data.map((subcategory, idx) => {
                                return (
                                    <li key={idx} className="text-md font-bold mb-2">
                                        <Link href={`/sottocategoria/${subcategory.attributes.slug}`}>{subcategory.attributes.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default MegaMenu;