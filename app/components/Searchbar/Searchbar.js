"use client";

import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "urql";
import { FILTER_QUERY, NO_QUERY } from "@/app/lib/query";
import SearchItem from "@/app/components/SearchItem/SearchItem";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Searchbar({setSearchIsOpen}) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const router = useRouter();

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [results] = useQuery({
        query: search.length >= 3 ? FILTER_QUERY : NO_QUERY,
        variables: {
            search: search.length >= 3 ? search : "",
        },
    });

    const { data, fetching, error } = results;

    if(error) return null;

    return (
        <motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className="flex items-center flex-wrap w-full max-w-6xl absolute -bottom-2 right-1/2 translate-x-2/4 translate-y-full p-10 bg-white shadow-xl z-30">
            <input type="text" className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white pl-10 pr-10 text-sm outline-none focus:outline-none focus:ring-2 focus:border-transparent" placeholder="Cerca" onChange={handleSearch} />
            <AiOutlineClose size={20} className="absolute right-4 top-4 cursor-pointer" onClick={() => setSearchIsOpen(false)} />
            <div className="flex flex-col w-full">
                {search.length >= 3 && data?.products?.data && data.products.data.map((result, idx) => (
                    <SearchItem key={idx} item={result} action={() => setSearchIsOpen(false)} />
                ))}
                {data?.products?.data && data.products.data.length === 0 && search.length >= 3 && (
                    <p className="text-center text-sm mt-5">Nessun risultato per questa ricerca</p>
                )}
            </div>
        </motion.div>
    );
}