"use client";
import { CATEGORIES_QUERY } from '@/app/lib/query';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'urql';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';


const MegaMenu = ({onMouseLeave}) => {

    const rounter = useRouter();

    const [results] = useQuery({
        query: CATEGORIES_QUERY,
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
  
    const { data:categorie, fetching, error } = results;

    useEffect(() => {
        if(categorie) {
            setCategories(categorie.categories.data);
            setSubcategories(categorie.subcategories.data);
        }
    }, [categorie]);
    
        if(fetching) return <Loader />;
        if(error) return router.push('/error');

    return (
        <div onMouseLeave={onMouseLeave} className="absolute top-20 left-0 w-full bg-white z-10 p-10 shadow">
            <div className="flex flex-col justify-between items-center w-full h-full">
                <div className="flex flex-row items-center w-full">
                    <h3 className="text-xl font-bold w-96 border-r-2">Categorie</h3>
                    <ul className="flex flex-row flex-wrap w-full">
                        {categories.map((category, idx) => (
                            <li key={idx} className="flex flex-row justify-center items-center px-5">
                                <Link className="text-md font-bold" href={`/categoria/${category.attributes.slug}`}>
                                    {category.attributes.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-row items-center w-full">
                    <h3 className="text-xl font-bold w-96 border-r-2">Sotto Categorie</h3>
                    <ul className="flex flex-row flex-wrap w-full">
                        {subcategories.map((subcategory, idx) => (
                            <li key={idx} className="flex flex-row justify-center items-center px-5">
                                <Link className="text-md font-bold" href={`/categoria/${subcategory.attributes.slug}`}>
                                    {subcategory.attributes.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;