"use client";

import { useEffect, useState } from "react";
import { ImSad } from "react-icons/im";
import { useQuery } from "urql";
import CardCategory from "@/app/components/CardCategory/CardCategory";
import { HOME_QUERY } from "@/app/lib/query";

export default function NotFound() {
    const [products, setProducts] = useState([]);

    const [results] = useQuery({
        query: HOME_QUERY
    });

    const { data, loading, error } = results;

    useEffect(() => {
        if(data) {
            setProducts(data.products.data);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return(
        <main className='bg-white p-5'>
            <section className="flex w-full justify-center items-center flex-col">
                <ImSad size={64} />
                <h1 className="font-black text-3xl text-center mt-5">
                    Scusa, non riusciamo a trovare la pagina che stai cercando.
                </h1>
                <h2 className="font-bold text-2xl text-center mt-5">
                    Forse cercavi uno di questi?
                </h2>
                <div  className="container mx-auto py-20 flex flex-wrap">
                    {products.map((category, idx) => (
                        <CardCategory key={idx} category={category.attributes} />
                    ))}
                </div>
            </section>
        </main>
    );
}