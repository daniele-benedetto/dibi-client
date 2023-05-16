"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import CardCategory from './components/CardCategory/CardCategory';
import Hero from './components/Hero/Hero';
import Loader from './components/Loader/Loader';
import { HOME_QUERY } from './lib/query';
import { motion } from 'framer-motion';

export default function Home() {

    const [results] = useQuery({
        query: HOME_QUERY,
    });

    const [products, setProducts] = useState([]);
    const router = useRouter();

    const {data, fetching, error} = results;

    useEffect(() => {
        if(data) {
            setProducts(data.products.data);
        }
    }, [data]);


    if(fetching) return <Loader />;
    if(error) return router.push('/error');

    return (
        <main className='bg-gray-100'>
            <Hero />
            <section className="w-full bg-gray-100 p-5 container mx-auto">
                <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Ti potrebbero interessare</motion.h3>
                <div className="mx-auto pt-5 flex flex-wrap">
                    {products.map((product, idx) => (
                        <CardCategory key={idx} category={product.attributes} size='1/4' />
                    ))}
                </div>
            </section>
        </main>
    );
};
