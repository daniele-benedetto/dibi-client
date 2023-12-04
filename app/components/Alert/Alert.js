"use client";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

export default function Alert({message}) {

    const [messaggioOpen, setMessaggioOpen] = useState(true);
    const [storageMessaggio, setStorageMessaggio] = useLocalStorage("messaggio", false);

    const handleClick = () => {
        setStorageMessaggio(true);
        setMessaggioOpen(false);
    }

    return (
        <>
            { messaggioOpen && !storageMessaggio && ( <section className="w-full background-second-color text-center p-5 flex-col flex items-center relative">
                <p className="text-xl font-bold">{message.title}</p>
                <p className="text-sm font-bold max-w-3xl text-center">{message.text}</p>
                <AiOutlineClose onClick={handleClick} size={20} color={'black'} className="absolute top-0 right-0 m-1 cursor-pointer border border-black rounded-full" />
            </section> )}
        </>
    );
}
