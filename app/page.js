"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import CardCategory from '@/app/components/CardCategory/CardCategory';
import Hero from '@/app/components/Hero/Hero';
import Loader from '@/app/components/Loader/Loader';
import { HOME_2_QUERY, HOME_QUERY } from '@/app/lib/query';
import { motion } from 'framer-motion';
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Image from "next/image";
import heroImage from "../public/images/hero.jpg";
import Link from 'next/link';

export default function Home() {

    const [results] = useQuery({
        query: HOME_QUERY,
    });

    const [results2] = useQuery({
        query: HOME_2_QUERY,
    });

    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);

    const router = useRouter();

    const {data, fetching, error} = results;
    const {data: data2, fetching: fetching2, error: error2} = results2;

    useEffect(() => {
        if(data) {
            setProducts(data.products.data);
        }
        if(data2) {
            setProducts2(data2.products.data);
        }
    }, [data, data2]);


    if(fetching) return <Loader />;
    if(error) return router.push('/error');

    return (
        <>
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} />}
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
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    <div className="mx-auto pt-5 flex flex-wrap items-center">
                        <div className="w-full md:w-1/2 p-5">
                            <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-xl font-black pt-5 border-b border-b-black">Esplora il Fascino del Vintage: La Passione per Oggetti Unici con Storia</motion.h3>
                            <div className="pt-5 pb-5">
                                <p>
                                    Benvenuti nel mondo del vintage, dove il tempo si ferma e ogni oggetto ha una storia da raccontare. Siamo affascinati dai pezzi d'epoca che portano con sé l'autenticità e il fascino di un'epoca passata. Nel nostro negozio online, ti invitiamo a scoprire un'eclettica collezione di oggetti vintage, dai mobili alle decorazioni, dagli accessori moda agli articoli da collezione. Ogni pezzo è stato scelto con cura per la sua qualità e la sua capacità di trasportarti in un'atmosfera retro unica. Sperimenta il piacere di possedere oggetti unici che parlano di un passato ricco di emozioni e storie. Esplora il nostro negozio e immergiti nel fascino senza tempo del vintage.
                                </p>
                            </div>
                            <Link href="/chi-sono" className="background-second-color text-white font-bold px-5 py-2 mt-5 shadow rounded-md text-lg">
                                Scopri di più
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 p-5">
                            <Image src={heroImage} objectFit="cover" alt="hero of my web site" />
                        </div>
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Ultimi arrivi</motion.h3>
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {products2.map((product, idx) => (
                            <CardCategory key={idx} category={product.attributes} size='1/4' />
                        ))}
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    <div className="mx-auto pt-5 flex flex-wrap items-center container border">
                    </div>
                </section>
            </main>
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </>
    );
};
