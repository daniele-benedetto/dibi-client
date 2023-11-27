"use client";
import { ImSad } from "react-icons/im";

export default function Error() {
    return(
        <div className="flex flex-col min-h-screen">
            <main className='bg-white p-5 flex-1 justify-center items-center flex'>
                <section className="w-full justify-center items-center flex flex-col">
                    <ImSad size={64} />
                    <h1 className="font-black text-3xl text-center mt-5">
                        Errore, c'è stato un problema tecnico.
                    </h1>
                    <h2 className="font-bold text-2xl text-center mt-5">
                        Attendere o contattare l'assistenza
                    </h2>
                </section>
            </main>
        </div>
    );
}