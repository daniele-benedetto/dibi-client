"use client";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/images/hero.jpg";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section style={{position: 'relative', height: '60vh', width: '100%', clipPath: 'inset(0 0 0 0)'}}>
            <div className="fixed h-full w-full left-0 top-0">
            <Image src={heroImage} layout="fill" objectFit="cover" sizes="100vw" alt="hero of my web site" />
            </div>
            <motion.div animate={{opacity: 1, y: 0}} initial={{opacity: 0, y: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="absolute h-full w-full left-0 top-0 flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-bold">Benvenuto nel tuo Ecommerce</h1>
                <p className="text-2xl">Il miglior negozio per acquistare i prodotti di cui hai bisogno</p>
                <Link href="/prodotti" className="mt-5 bg-black text-white uppercase font-bold px-5 py-2 shadow rounded-md text-xl">
                    Visita lo store
                </Link>
            </motion.div>
        </section>
    );
}