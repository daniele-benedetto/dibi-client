"use client";

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
import CardBg from './components/CardBg/CardBg';
import Alert from './components/Alert/Alert';
import Error from 'next/error';

export default function Home() {

    const [results] = useQuery({
        query: HOME_QUERY,
    });

    const [results2] = useQuery({
        query: HOME_2_QUERY,
    });

    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [categories, setCategories] = useState([]);

    const {data, fetching, error} = results;
    const {data: data2, fetching: fetching2, error: error2} = results2;

    useEffect(() => {
        if(data) {
            setProducts(data.products.data);
        }
        if(data2) {
            setProducts2(data2.products.data);
            setCategories(data2.categories.data);
        }
    }, [data, data2]);


    if(fetching) return <Loader />;
    if(error) return Error();
    return (
        <>
            {data?.general?.data.attributes.message?.active && <Alert message={data?.general?.data.attributes.message} />}
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} />}
            <main className='bg-gray-100'>
                <Hero
                    title="Esplora il fascino del vintage"
                    subtitle="Trova i tesori usati nel nostro negozio online"
                    description="Esplora il fascino senza tempo del vintage nel nostro negozio online. Trova pezzi unici con storie uniche, dalla moda ai mobili. Rinnova il passato e crea una casa con carattere."
                    cta="Scopri i prodotti"
                    link="/prodotti"
                />
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
                        <Hero
                            title="La passione per oggetti unici con storia"
                            description="Benvenuti nel mondo del vintage, dove il tempo si ferma e ogni oggetto ha una storia da raccontare. Siamo affascinati dai pezzi d'epoca che portano con sé l'autenticità e il fascino di un'epoca passata."                
                            cta="Scopri di più"
                            link="/chi-sono"
                        />
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Categorie preferite</motion.h3>
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {categories.map((product, idx) => (
                            <CardBg key={idx} category={product.attributes} size='1/3' />
                        ))}
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
            </main>
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </>
    );
};
