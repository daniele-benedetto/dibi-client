"use client";

import { useEffect, useState } from "react";
import { ImSmile } from "react-icons/im";
import { useQuery } from "urql";
import CardCategory from "@/app/components/CardCategory/CardCategory";
import { useStateCartContext } from "@/app/context/cart";
import { HOME_QUERY } from "@/app/lib/query";

export default function ThankYou() {

    const [categories, setCategories] = useState([]);

    const { setCartItems } = useStateCartContext();

    const [results] = useQuery({
        query: HOME_QUERY
    });

    const { data, loading, error } = results;

    useEffect(() => {
        if(data) {
            setCategories(data.products.data);
        }
    }, [data]);

    useEffect(() => {
        setCartItems([]);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return(
        <main className='bg-white p-5'>
            <section className="flex w-full justify-center items-center flex-col">
                <ImSmile size={64} />
                <h1 className="font-black text-3xl text-center mt-5">
                    Grazie per aver acquistato da noi!
                </h1>
                <h2 className="font-bold text-2xl text-center mt-5">
                    Il tuo ordine è stato registrato correttamente. Ti abbiamo inviato una mail di conferma.
                </h2>
                <h3 className="font-bold text-xl text-center mt-5">
                    Lasciati ispirare da questi prodotti per il tuo prossimo acquisto.
                </h3>
                <div  className="container mx-auto py-20 flex flex-wrap">
                    {categories.map((category, idx) => (
                        <CardCategory size={'1/4'} key={idx} category={category.attributes} />
                    ))}
                </div>
            </section>
        </main>
    );
}