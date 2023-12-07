"use client";
import { BsSearch, BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {  FaUserAlt, FaUserCircle } from "react-icons/fa";
import { RiShoppingBagLine, RiShoppingBag3Line } from 'react-icons/ri';
import useWindowSize from "@/app/hooks/useWindowSize";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import VerticalMenu from "@/app/components//VerticalMenu/VerticalMenu";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import CartMenu from "@/app/components/CartMenu/CartMenu";
import { useStateCartContext } from "@/app/context/cart";
import { UserContext } from "@/app/context/user";
import LoginForm from "@/app/components/LoginForm/LoginForm";
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";
import Image from "next/image";
import logoImage from "../../../public/images/logo_cianfrusalia.png";
import MegaMenu from "../MegaMenu/MegaMenu";

export default function Navbar({navbar, categories}) {

    const pathname = usePathname();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
    const [megaMenuVisible, setMegaMenuVisible] = useState(false);

    const { totalQty, setShowCart, showCart} = useStateCartContext();
    const { checkLogin, user, email } = useContext(UserContext);
    
    const size = useWindowSize();

    const openMenu = () => {
        setSearchIsOpen(false);
        setShowCart(false);
        setMenuIsOpen(!menuIsOpen);
    };

    const openCart = () => {
        if(pathname !== '/checkout') {
            setSearchIsOpen(false);
            setMenuIsOpen(false);
            setShowCart(!showCart);
        }
    };

    const openSearch = () => {
        setShowCart(false);
        setMenuIsOpen(false);
        setSearchIsOpen(!searchIsOpen);
    };

    const hoverItemMenu = (item) => {
        if(item.children) {
            setMegaMenuVisible(true);
        } else {
            setMegaMenuVisible(false);
        }
    };
    
    useEffect(() => {
        const checkUser = async () => {
            const res = await checkLogin();
            if (res && res.status === 200) {
                return true;
            }
            return false;
        }
        checkUser();        
    }, []);

    return (
        size.width < 768 ? (
            <>
                <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm p-2 z-20">
                    <div className="flex items-center w-24">
                        <BsSearch size={20} onClick={openSearch} />
                    </div>
                    <div className="flex items-center justify-center w-full capitalize">
                        <Link href='/'>
                            <Image src={logoImage} alt="Logo di Cianfrusalia" width={100} height={100} />
                        </Link>
                    </div>
                    <div className="flex items-center justify-between w-24">
                        <div className="relative">
                            { !showCart && <RiShoppingBagLine size={24} onClick={openCart} /> }
                            { showCart && <RiShoppingBag3Line size={24} onClick={openCart} /> }
                            { totalQty > 0 && <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">{totalQty}</span> }
                        </div>
                        { !menuIsOpen && <AiOutlineMenu size={24} onClick={openMenu} /> }
                        { menuIsOpen && <AiOutlineClose size={24} onClick={openMenu} /> }
                    </div>
                    { searchIsOpen && <Searchbar setSearchIsOpen={setSearchIsOpen} /> }
                </nav>
                { menuIsOpen && <VerticalMenu setMenuIsOpen={setMenuIsOpen} navbar={navbar} categories={categories} email={email} user={user} /> }
                { showCart && <CartMenu setShowCart={setShowCart} mobile={true} /> }
            </>    
        ) : ( 
            <nav className="flex justify-between flex-wrap items-center bg-white text-black relative shadow-sm px-10 ">
                <div className="flex items-center w-full justify-center p-2">
                    <Link href="/">
                        <Image src={logoImage} alt="Logo di Cianfrusalia" width={200} height={200} />
                    </Link>
                </div>
                <div onMouseLeave={() => setMegaMenuVisible(false)} className="flex items-center justify-center w-full p-2 ">
                    <ul className="flex w-full max-w-xl justify-between text-md uppercase font-black text-lg relative">
                        {navbar.map(item => {
                            return (
                                <li 
                                    onMouseEnter={() => hoverItemMenu(item)}
                                    className="itemMenu" 
                                    key={item.id}
                                >
                                    <Link href={item.link}>{item.text}</Link>
                                </li> 
                            );
                        })}
                    </ul>
                    { megaMenuVisible && <MegaMenu categories={categories} /> }
                </div>
                <div className="flex items-center justify-end w-80 absolute top-10 right-10">
                    <BsSearch color="#F68129" onClick={() => setSearchIsOpen(!searchIsOpen)} size={20} className="cursor-pointer mx-2" />
                    <div className="relative">
                        <RiShoppingBagLine color="#F68129" onClick={openCart} size={24} className="cursor-pointer mx-2" />
                        { totalQty > 0 && <motion.span animate={{scale: 1}} initial={{scale: 0}} className="absolute -top-2 -left-2 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">{totalQty}</motion.span> }
                    </div>
                    <div className="relative">
                        {!user && <FaUserAlt color="#F68129" onClick={() => setUserMenuIsOpen(!userMenuIsOpen)} size={24} className="cursor-pointer mx-2" />}
                        {user && <span onClick={() => setUserMenuIsOpen(!userMenuIsOpen)} className="flex items-center justify-center rounded-full text-gray-700 text-md cursor-pointer mx-2 underline">{email}</span>}
                        { userMenuIsOpen && <div className="absolute top-full translate-y-3 right-3 bg-white shadow-md rounded-md p-5 w-72 max-w-md z-10">
                            <AiOutlineClose onClick={() => setUserMenuIsOpen(false)} size={16} className="cursor-pointer absolute top-1 right-1" />
                            { !user  && <LoginForm setUserMenuIsOpen={setUserMenuIsOpen} /> }
                            { user && <div className="flex mt-5 flex-wrap">
                                <div className="flex flex-col items-center justify-center">
                                    <Link onClick={() => setUserMenuIsOpen(false)} href="/user">
                                        <FaUserCircle size={40} />
                                    </Link>
                                </div>
                                <div className="flex flex-col ml-5">
                                    <Link href={'/user'} onClick={() => setUserMenuIsOpen(false)} className="text-sm">{user}</Link>
                                    <Link href={'/user'} onClick={() => setUserMenuIsOpen(false)} className="text-xs">{email}</Link>
                                    <div className="flex">
                                        <Link onClick={() => setUserMenuIsOpen(false)} className="text-xs text-gray-700 mr-2" href="/user">Account</Link>
                                        <Link onClick={() => setUserMenuIsOpen(false)} className="text-xs text-gray-700 mr-2" href="/user/logout">Logout</Link>
                                    </div>
                                </div>
                            </div>}
                        </div> }
                    </div>
                </div>
                { searchIsOpen && <Searchbar setSearchIsOpen={setSearchIsOpen} />}
                { showCart && <CartMenu setShowCart={setShowCart} mobile={false} /> }    
            </nav>
        )
    );
};
