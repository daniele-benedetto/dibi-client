'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CardBg = ({ category, size }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ ease: 'linear', duration: 0.75, delay: 0.5 }}
      className={`flex items-center justify-center w-full relative drop-shadow-2xl ${
        size === '1/4'
          ? 'md:w-1/4'
          : size === '1/3'
          ? 'md:w-1/3'
          : 'md:w-1/2'
      } p-10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/prodotto/${category.slug}`} className='relative w-full border-custom-second-color'>
        <motion.div
          className='w-full h-full'
          style={{
            opacity: isHovered ? 0.8 : 0,
            transition: 'opacity 0.3s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
          }}
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.image.data.attributes.url}`}
          alt={category.name}
          width={800}
          height={800}
        />
      </Link>
      <Link
        href={`/prodotto/${category.slug}`}
        className={`text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? 'visible' : 'invisible'
        }`}
      >
        <motion.h3 
            className={`text-white p-4 rounded-lg text-2xl font-bold capitalize`}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ ease: 'linear', duration: 0.75, delay: 0.5 }}
        >
          {category.name}
        </motion.h3>
      </Link>
      <style jsx>{`
        .visible {
          opacity: 1;
        }
        .invisible {
          opacity: 0;
        }
      `}</style>
    </motion.div>
  );
};

export default CardBg;
