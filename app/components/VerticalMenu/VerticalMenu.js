"use client";
import Link from "next/link";
import { FaChevronDown, FaChevronRight, FaUserAlt } from "react-icons/fa";
import { useLockBodyScroll } from "@/app/hooks/useLockBodyScroll";
import { motion } from "framer-motion";
import { useState } from "react";

export default function VerticalMenu({navbar, setMenuIsOpen, categories, email, user}) {

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showSubSubmenu, setShowSubSubmenu] = useState(null);

    useLockBodyScroll();

    return (
        <motion.ul 
            className="flex flex-col w-full text-2xl fixed top-0 left-0 font-bold bg-white h-screen overflow-auto z-10 pt-24 p-10 mt-10 md:mt-0"
            initial={{x: "100%"}}
            animate={{x: "0"}}
            exit={{x: "100%"}}
            transition={{duration: 0.33}}
        >
            {navbar.map(item => {
                if(!item.children) {
                    return (
                        <li className="my-1 border-b border-b-black max-w-[275px]" key={item.id}>
                            <Link onClick={() => setMenuIsOpen(false)} href={item.link}>{item.text}</Link>
                        </li>
                    )
                } else {
                    return (
                        <li className="my-1 border-b border-b-black relative max-w-[275px]" key={item.id}>
                            <span onClick={() => setShowSubMenu(!showSubMenu)} >{item.text}</span>
                                {!showSubMenu && <FaChevronRight onClick={() => setShowSubMenu(!showSubMenu)} size={20} className="absolute top-0 right-0 transform -translate-y-1/2 mt-3" /> }                            
                                {showSubMenu && <FaChevronDown onClick={() => setShowSubMenu(!showSubMenu)} size={20} className="absolute top-0 right-0 transform -translate-y-1/2 mt-3" /> }                            
                                {showSubMenu && <motion.ul 
                                    className="flex flex-col"
                                    initial={{height: 0}}
                                    animate={{height: "auto"}}
                                    exit={{height: 0}}
                                    transition={{duration: 0.33}}
                                >
                                    {categories && categories.length > 0 && categories.map((category, idx) => {
                                        return (
                                            <li key={idx} className="my-1 text-xl relative mx-5 max-w-[275px]">
                                                    <Link onClick={() => setMenuIsOpen(false)} href={`/categoria/${category.attributes.slug}`}>{category.attributes.name}</Link>
                                                    { showSubSubmenu != idx && <FaChevronRight onClick={() => setShowSubSubmenu(idx)} size={20} className="absolute top-0 right-0 transform -translate-y-1/2 mt-3" /> }
                                                    { showSubSubmenu == idx && <FaChevronDown onClick={() => setShowSubSubmenu(idx)} size={20} className="absolute top-0 right-0 transform -translate-y-1/2 mt-3" /> }
                                                {showSubSubmenu == idx && <motion.ul
                                                    className="flex flex-col"
                                                    initial={{height: 0}}
                                                    animate={{height: "auto"}}
                                                    exit={{height: 0}}
                                                    transition={{duration: 0.33}}
                                                >
                                                    {category.attributes.subcategories.data && category.attributes.subcategories.data.length > 0 && category.attributes.subcategories.data.map((subcategory, index) => {
                                                        return (
                                                            <li key={idx} className="my-1 text-lg mx-10 max-w-[275px]">
                                                                <Link onClick={() => setMenuIsOpen(false)} href={`/sottocategoria/${subcategory.attributes.slug}`}>{subcategory.attributes.name}</Link>
                                                            </li>
                                                        );
                                                    })}
                                                </motion.ul> }
                                            </li>
                                        );
                                    })}
                                </motion.ul> }
                        </li>
                    )
                }
            })}
            { !user && <Link className="my-3 border-b border-b-black flex items-center max-w-[275px]" onClick={() => setMenuIsOpen(false)} href="/user/login">
                <FaUserAlt className="mr-3" size={20} />
                Accedi
            </Link> }
            { user && <Link className="my-3 border-b border-b-black flex items-center max-w-[275px]" onClick={() => setMenuIsOpen(false)} href="/user">
                <FaUserAlt className="mr-3" size={20} />
                {user}
            </Link> }
        </motion.ul>
    );
}