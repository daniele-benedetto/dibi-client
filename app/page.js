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
import Cookies from './components/Cookies/Cookies';
import Alert from './components/Alert/Alert';

export default function Home() {

    const [results] = useQuery({
        query: HOME_QUERY,
        
    });


    const {data, fetching, error} = results;
    if(fetching) return <Loader />;
    if(error) return <p>Errore</p>;

    const { general, products, products2, categories, categories2 } = data;

    return (
        <>
            {general?.data.attributes.top_bar && <Topbar topbar={general.data.attributes.top_bar} />}
            {general?.data.attributes.navbar && <Navbar navbar={general.data.attributes.navbar} categories={categories2.data} /> }
            {general?.data.attributes.message?.active && <Alert message={general?.data.attributes.message} />}
            <main className='bg-gray-100'>
                <Hero
                    title="Un oggetto dopotutto, è ciò che rende privato l'infinito"
                    subtitle="Cit. Losif Brodskij"
                    description="Spulciando tra le nostre proposte riscoprirai tanti oggetti del tuo passato, pronti ad aprire il cassetto dei ricordi, dando un nuovo e caldo colore alla tua casa."
                    cta="Scopri i prodotti"
                    link="/prodotti"
                />
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    { products.data.length > 0 && <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Prodotti in offerta</motion.h3> }
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {products.data.map((product, idx) => (
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
                    { categories.data.length > 0 && <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Categorie</motion.h3> }
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {categories.data.map((product, idx) => (
                            <CardBg key={idx} category={product.attributes} size='1/5' />
                        ))}
                    </div>
                </section>
                <section className="w-full bg-gray-100 p-5 container mx-auto">
                    {products2.data.length > 0 && <motion.h3 animate={{opacity: 1, x: 0}} initial={{opacity: 0, x: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="text-2xl font-black pt-5 border-b border-b-black">Ultimi arrivi</motion.h3> }
                    <div className="mx-auto pt-5 flex flex-wrap">
                        {products2.data.map((product, idx) => (
                            <CardCategory key={idx} category={product.attributes} size='1/4' />
                        ))}
                    </div>
                </section>
            </main>
            {general?.data.attributes.footer && <Footer footerServizioClienti={general.data.attributes.footer.footerServizioClienti} footerAbout={general.data.attributes.footer.footerAbout} footerSocial={general.data.attributes.footer.footerSocial} />}
            <Cookies />
        </>
    );
};
