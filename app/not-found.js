"use client";

import { ImSad } from "react-icons/im";

export default function NotFound() {
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
            </section>
        </main>
    );
}