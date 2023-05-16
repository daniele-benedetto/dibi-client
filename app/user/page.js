"use client";

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context/user';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import CartItem from '@/app/components/CartItem/CartItem';
import { useStateCartContext } from '@/app/context/cart';
import WishItem from '@/app/components/WishItem/WishItem';
import OrderItem from '@/app/components/OrderItem/OrderItem';

export default function User() {

    const { checkLogin, user, email, userWishlist  } = useContext(UserContext);
    const { cartItems, onAdd, onRemove } = useStateCartContext();
    const router = useRouter();
    
    useEffect(() => {
        const checkUser = async () => {
            const res = await checkLogin();
            if (res.status !== 200) {
                router.push('/user/login');
                return false;
            }
        }
        checkUser();
    }, []);

    return (
        <main className='bg-white p-5'>
            <div className='flex flex-wrap container m-auto'>
                <div className='w-full md:w-1/3 flex flex-col p-10 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <FaUserCircle className='text-8xl text-gray-300 mb-5' />
                        <h1 className='text-2xl font-bold'>{user}</h1>
                        <p className='text-md mb-5'>{email}</p>
                        <Link onClick={() => setUserMenuIsOpen(false)} className="border border-black px-5 py-2 font-bold" href="/user/logout">Logout</Link>
                    </div>
                </div>
                <section className='flex flex-wrap w-full md:w-1/3'>
                    <div className='w-full p-2'>
                        <h1 className='text-2xl font-bold mb-5'>I tuoi ordini:</h1>
                        <div className='flex flex-wrap'>
                            <div className='w-full'>
                                <OrderItem />
                            </div>
                        </div>  
                    </div>  
                </section>
                <section className='flex flex-wrap w-full md:w-1/3'>
                    <div className='w-full p-2'>
                        <h1 className='text-2xl font-bold mb-5'>La lista dei tuoi desideri:</h1>
                        {userWishlist && userWishlist.length > 0 && userWishlist.map((item, idx) => (
                            <WishItem key={idx} item={item} />
                        ))}
                        {userWishlist && userWishlist.length === 0 && (
                            <p className='text-md mb-5'>Non hai prodotti nella tua lista dei desideri</p>
                        )}
                    </div>
                    <div className='w-full p-2'>
                        <h1 className='text-2xl font-bold mb-5'>Il tuo carrello:</h1>
                        {cartItems && cartItems.length > 0 && cartItems.map((item) => (
                            <CartItem key={idx} item={item} onAdd={onAdd} onRemove={onRemove} />
                        ))}
                        {cartItems && cartItems.length === 0 && (
                            <p className='text-md mb-5'>Non hai prodotti nel tuo carrello</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};