"use client";

import Accordion from "@/app/components/Accordion/Accordion";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import Image from "next/image";
import { useQuery } from "urql";
import Loader from "@/app/components/Loader/Loader";
import { PAGE_QUERY } from "@/app/lib/query";
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import { marked } from 'marked';
export default function Page({params}) { 

    const [results] = useQuery({
        query: PAGE_QUERY,
        variables: {
            slug: params.page
        }
    });

    const { data, fetching, error } = results;

    if(fetching) return <Loader />;

    return (
        <>
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} />}
            <main className='bg-white p-5'>
                <section className='max-w-6xl mx-auto'>
                    <div style={{position: 'relative', height: '40vh', width: '100%', clipPath: 'inset(0 0 0 0)'}}>
                        <div className="fixed h-full w-full left-0 top-0">
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.pages?.data[0]?.attributes?.image.data.attributes.url}`} layout="fill" objectFit="cover" sizes="100vw" alt="hero of my web site" priority={true} />
                        </div>
                        <div className="absolute h-full w-full left-0 top-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-25">
                            <h1 className='text-5xl font-bold my-5 text-white'>{data?.pages?.data[0]?.attributes?.title}</h1>
                            <p className="text-2xl text-white font-bold">{data?.pages?.data[0]?.attributes?.subtitle}</p>
                        </div>
                    </div>
                </section>
                <section className='max-w-6xl mx-auto mt-10'>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(data?.pages?.data[0]?.attributes?.content) }} />
                </section>
                {data?.pages.data[0]?.attributes?.faq && data?.pages.data[0]?.attributes?.faq.length > 0 && <section className='max-w-6xl mx-auto my-10'>
                    <h3 className='text-3xl font-bold my-5'>Le domande più frequenti</h3>
                    {data.pages.data[0].attributes.faq.map((item, index) => {
                        return <Accordion key={index} title={item.title} content={item.content} />
                    })}
                </section> }
                {data?.pages?.data[0]?.attributes?.contact_form && <section className='max-w-6xl mx-auto'>
                    <h3 className='text-3xl font-bold my-5'>Contattami per qualunque necessità</h3>
                    <ContactForm />
                </section> }
            </main>
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </>
    );

}

