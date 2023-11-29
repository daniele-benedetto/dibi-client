"use client";

import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import CardCategory from '@/app/components/CardCategory/CardCategory';
import Hero from '@/app/components/Hero/Hero';
import Loader from '@/app/components/Loader/Loader';
import { HOME_QUERY } from '@/app/lib/query';
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

    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [categories, setCategories] = useState([]);

    const {data, fetching, error} = results;

    useEffect(() => {
        if(data) {
            setProducts(data.products.data);
            setProducts2(data.products2.data);
            setCategories(data.categories.data);
        }
    }, [data]);


    if(fetching) return <Loader />;
    if(error) return Error();
    return (
        <>
            {data?.general?.data.attributes.message?.active && <Alert message={data?.general?.data.attributes.message} />}
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} />}
            <main className='bg-gray-100'>
                <Hero
                    title="Un oggetto dopotutto, è ciò che rende privato l'infinito"
                    subtitle="Cit. Losif Brodskij"
                    description="Spulciando tra le nostre proposte riscoprirai tanti oggetti del tuo passato, pronti ad aprire il cassetto dei ricordi, dando un nuovo e caldo colore alla tua casa."
                    cta="Scopri i prodotti"
                    link="/prodotti"
                />
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    { products.length > 0 && <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Ti potrebbero interessare</motion.h3> }
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {products.map((product, idx) => (
                            <CardCategory key={idx} category={product.attributes} size='1/4' />
                        ))}
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    <div className="mx-auto pt-5 flex flex-wrap items-center">
                        <Hero
                            title="Passione, accuratezza nella ricerca, originalità fanno di Cian Frusalia il tuo vintage shop ideale"
                            description=""                
                            cta="Scopri di più"
                            link="/chi-sono"
                        />
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    { categories.length > 0 && <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Categorie</motion.h3> }
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {categories.map((product, idx) => (
                            <CardBg key={idx} category={product.attributes} size='1/3' />
                        ))}
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    {products2.length > 0 && <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Ultimi arrivi</motion.h3> }
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
