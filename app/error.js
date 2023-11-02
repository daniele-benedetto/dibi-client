"use client";
import { useRouter } from "next/navigation";
import { ImSad } from "react-icons/im";
import { useQuery } from "urql";
import Loader from "@/app/components/Loader/Loader";
import { GENERAL_QUERY } from "./lib/query";
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';

export default function Error() {

    const router = useRouter();
    const [results] = useQuery({
        query: GENERAL_QUERY,
    });

    const { data, fetching, error } = results;

    if(fetching) return <Loader />;
    if(error) return <p>Errore di connessione</p>;

    return(
        <div className="flex flex-col min-h-screen">
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} />}
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
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </div>
    );
}