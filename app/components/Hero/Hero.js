"use client";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/images/hero.jpg";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section style={{position: 'relative', height: '60vh', width: '100%', clipPath: 'inset(0 0 0 0)', padding:'20px'}}>
            <div className="fixed h-full w-full left-0 top-0">
                <Image src={heroImage} layout="fill" objectFit="cover" sizes="100vw" alt="hero of my web site" />
            </div>
            <motion.div animate={{opacity: 1, y: 0}} initial={{opacity: 0, y: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="absolute h-full w-full left-0 top-0 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Esplora il fascino del vintage
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold">
                    Trova i tesori usati nel nostro negozio online
                </h2>
                <p className="text- md:text-xl mt-5">
                    Esplora il fascino senza tempo del vintage nel nostro negozio online.<br/>Trova pezzi unici con storie uniche, dalla moda ai mobili.<br/>Rinnova il passato e crea una casa con carattere.
                </p>
                <Link href="/prodotti" className="background-second-color text-white font-bold px-5 py-2 mt-5 shadow rounded-md text-lg">
                    Visita il negozio
                </Link>
            </motion.div>
        </section>
    );
}