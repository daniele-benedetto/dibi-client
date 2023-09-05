"use client";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

export default function Alert({messaggio}) {

    const [messaggioOpen, setMessaggioOpen] = useState(true);
    const [storageMessaggio, setStorageMessaggio] = useLocalStorage("messaggio", false);


    const handleClick = () => {
        setStorageMessaggio(true);
        setMessaggioOpen(false);
    }

    return (
        <>
            { messaggioOpen && !storageMessaggio && ( <section className="w-full bg-yellow-300 absolute top-0 left-0 text-center z-30 p-5">
                <p className="text-md font-bold">ATTENZIONE</p>
                <p className="text-sm font-bold">{messaggio}</p>
                <AiOutlineClose onClick={handleClick} size={20} color={'black'} className="absolute top-0 right-0 m-1 cursor-pointer border border-black rounded-full z-40" />
            </section> )}
        </>
    );
}
