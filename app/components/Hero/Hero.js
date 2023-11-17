"use client";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/images/bg-nuovo.jpg";
import { motion } from "framer-motion";

export default function Hero({title, subtitle, description, cta, link}) {
    return (
        <section style={{position: 'relative', minHeight: '60vh', width: '100%', clipPath: 'inset(0 0 0 0)', padding:'20px'}}>
            <div className="fixed h-full w-full left-0 top-0">
                <Image src={heroImage} layout="fill" objectFit="cover" sizes="100vw" alt="hero of my web site" />
            </div>
            <motion.div animate={{opacity: 1, y: 0}} initial={{opacity: 0, y: -20}} transition={{ease: 'linear', duration: 0.75, delay: 0.5}} className="absolute h-full w-full left-0 top-0 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold max-w-4xl">
                    {title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold">
                    {subtitle}
                </h2>
                <p className="text- md:text-2xl mt-5 max-w-4xl">
                    {description}
                </p>
                <Link href={link} className="background-second-color text-white font-bold px-5 py-2 mt-5 shadow rounded-md text-lg">
                    {cta}
                </Link>
            </motion.div>
        </section>
    );
}