"use client";
import { useCountdown } from "@/app/hooks/useCountDown";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useState } from "react";
import Counter from "@/app/components/Counter/Counter";

import { AiOutlineClose } from "react-icons/ai";

export default function Popup({popup}) {

    const [popupOpen, setPopupOpen] = useState(true);
    const [storagePromo, setStoragePromo] = useLocalStorage("promo", false);

    const date = new Date(popup.time);
    const [days, hours, minutes, seconds] = useCountdown(date);

    const handleClick = () => {
        setStoragePromo(true);
        setPopupOpen(false);
    }

    return (
        <>
            { popupOpen && !storagePromo && ( <section className="w-full bg-yellow-300 absolute top-0 left-0 text-center z-30 p-5">
                <p className="text-md font-bold">{popup.title}</p>
                <div className="flex justify-center items-center my-5">
                    {[days, hours, minutes, seconds].map((time, index) => {
                        return (
                            <Counter key={index} time={time} text={index === 0 ? "Giorni" : index === 1 ? "Ore" : index === 2 ? "Minuti" : "Secondi"} />
                        );
                    })}
                </div>
                <p className="text-sm font-bold">{popup.text}</p>
                <AiOutlineClose onClick={handleClick} size={20} color={'black'} className="absolute top-0 right-0 m-1 cursor-pointer border border-black rounded-full z-40" />
            </section> )}
        </>
    );
}
