"use client";
import { useEffect, useState } from "react";
import useWindowSize from "@/app/hooks/useWindowSize";

export default function PageTitle({page}) {

    const [description, setDescription] = useState(page.description);
    const [openParagraph, setOpenParagraph] = useState(false);
    const size = useWindowSize();

    useEffect(() => {
        if (description.length > 150 && size.width < 768) {
            setDescription(description.slice(0, 150) + '...');
        } else {
            setDescription(page.description);
        }
    }, [description, size]);

    return (
        <div className="w-full flex flex-col mb-5 container m-auto">
            <h2 className="text-3xl font-bold mb-3">{page.title}</h2>
            <p onClick={() => setOpenParagraph(!openParagraph)} className="text-sm">{openParagraph ? page.description : description}</p>
        </div>
    );
}