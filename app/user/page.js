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
import Toast from '../components/Toast/Toast';
import { useQuery } from "urql";
import { GENERAL_QUERY } from "@/app/lib/query";
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Loader from '@/app/components/Loader/Loader';
import Error from 'next/error';

export default function User() {
    const {
        checkLogin,
        user,
        email,
        userWishlist,
        userOrder,
        doWishList,
    } = useContext(UserContext);
    const { cartItems, onAdd, onRemove } = useStateCartContext();
    const router = useRouter();
    const [wishList, setWishList] = useState([]);
    const [toastFavorite, setToastFavorite] = useState(false);

    const removeProductFromWishList = async (idx) => {
        const newWishlist = userWishlist.filter((item, index) => index !== idx);

        const response = await doWishList(newWishlist);
        if (response && response.status === 200) {
            setWishList(newWishlist);
            setToastFavorite(true);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const res = await checkLogin();
            if (res && res.status !== 200) {
                router.push('/user/login');
                return false;
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        if (userWishlist) {
            setWishList(userWishlist);
        }
    }, [userWishlist]);

    const [results] = useQuery({
        query: GENERAL_QUERY,
        
    });

    const { data, fetching, error } = results;

    if (fetching) return <Loader />;
    if (error) return Error();

    const {
        top_bar,
        navbar,
        categories,
        general: { data: generalData },
    } = data;

    const { attributes: generalAttributes } = generalData.data;

    const renderToastFavorite = () => (
        toastFavorite && <Toast type={'success'} text={'Prodotto rimosso dalla tua wishlist'} setToast={setToastFavorite} />
    );

    return (
        <>
            {top_bar && <Topbar topbar={top_bar} />}
            {navbar && <Navbar navbar={navbar} categories={categories.data} />}
            <main className='bg-white p-5'>
                {renderToastFavorite()}
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
                                    {userOrder && userOrder.length > 0 ? (
                                        userOrder.map((item, idx) => (
                                            <OrderItem key={idx} item={item} />
                                        ))
                                    ) : (
                                        <p className='text-md mb-5'>Non hai effettuato nessun ordine</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='flex flex-wrap w-full md:w-1/3'>
                        <div className='w-full p-2'>
                            <h1 className='text-2xl font-bold mb-5'>La lista dei tuoi desideri:</h1>
                            {wishList && wishList.length > 0 ? (
                                wishList.map((item, idx) => (
                                    <WishItem key={idx} item={item} action={() => removeProductFromWishList(idx)} />
                                ))
                            ) : (
                                <p className='text-md mb-5'>Non hai prodotti nella tua lista dei desideri</p>
                            )}
                        </div>
                        <div className='w-full p-2'>
                            <h1 className='text-2xl font-bold mb-5'>Il tuo carrello:</h1>
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item, idx) => (
                                    <CartItem key={idx} item={item} onAdd={onAdd} onRemove={onRemove} />
                                ))
                            ) : (
                                <p className='text-md mb-5'>Non hai prodotti nel tuo carrello</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            {generalAttributes.footer && (
                <Footer
                    footerServizioClienti={generalAttributes.footer.footerServizioClienti}
                    footerAbout={generalAttributes.footer.footerAbout}
                    footerSocial={generalAttributes.footer.footerSocial}
                />
            )}
        </>
    );
}
