"use client";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useState } from "react";
import Button from '../Button/Button';
import { AiOutlineClose } from "react-icons/ai";
import {useRouter} from 'next/navigation';

export default function Cookies() {

    const router = useRouter();

    const [cookiesOpen, setCookiesOpen] = useState(true);
    const [storageCookies, setStorageCookies] = useLocalStorage("cookies", false);

    const handleClick = () => {
        setStorageCookies(true);
        setCookiesOpen(false);
    }

    return (
        <>
            { cookiesOpen && !storageCookies && ( <section className="w-full background-first-color p-5 flex-col flex items-center fixed bottom-0 z-50">
                <p className="text-sm font-bold max-w-5xl">
                    La tua privacy è importante per noi! Utilizziamo solo cookie tecnici indispensabili per garantire il corretto funzionamento del nostro sito e migliorare la tua esperienza di navigazione.<br/>
                    I cookie tecnici sono essenziali per attività quali l'autenticazione, la gestione della sessione e la memorizzazione delle preferenze dell'utente. Questi cookie non raccolgono informazioni personali e non possono essere disabilitati attraverso questa finestra di dialogo.<br/>
                    Se desideri ulteriori informazioni, <Button text={'clicca su qui'} type={'underline'} action={() => router.push('/privacy-policy')} /> per accedere alla nostra informativa sulla privacy.<br/>
                </p>
                <div className="w-full max-w-5xl flex justify-end">
                    <Button text={'Chiudi'} type={'container'} action={handleClick} />
                </div>
            </section> )}
        </>
    );
}
