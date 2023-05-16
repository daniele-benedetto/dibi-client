"use client";

import Accordion from "@/app/components/Accordion/Accordion";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import Image from "next/image";
import heroImage from '../../../public/images/hero.jpg'

export default function Page({params}) { 
    return (
        <main className='bg-white p-5'>
            <section className='max-w-6xl mx-auto'>
                <div style={{position: 'relative', height: '40vh', width: '100%', clipPath: 'inset(0 0 0 0)'}}>
                    <div className="fixed h-full w-full left-0 top-0">
                    <Image src={heroImage} layout="fill" objectFit="cover" sizes="100vw" alt="hero of my web site" />
                    </div>
                    <div className="absolute h-full w-full left-0 top-0 flex flex-col justify-center items-center text-center">
                        <h1 className='text-5xl font-bold my-5'>Titolo della mia pagina</h1>
                        <p className="text-2xl">Sotto titolo di questa pagina</p>
                    </div>
                </div>
            </section>
            <section className='max-w-6xl mx-auto mt-10'>
                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
            </section>
            <section className='max-w-6xl mx-auto my-10'>
                <h3 className='text-3xl font-bold my-5'>Le domande più frequenti</h3>
                <Accordion />
            </section>
            <section className='max-w-6xl mx-auto'>
                <h3 className='text-3xl font-bold my-5'>Contattaci per qualunque necessità</h3>
                <ContactForm />
            </section>
        </main>
    );

}

