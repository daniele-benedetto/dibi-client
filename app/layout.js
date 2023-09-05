"use client";
import '@/app/globals.css';
import { Lato, Lora } from 'next/font/google';
import { CartContext } from '@/app/context/cart';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import UserProvider from '@/app/context/user';
import Whatsapp from './components/Whatsapp/Whatsapp';

const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    display: 'swap'
});

const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap'
});

const client = new Client({
    url: process.env.NEXT_PUBLIC_BACKEND_API,
    exchanges: [cacheExchange, fetchExchange],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={lora.className}>
                <Provider value={client}>
                    <UserProvider>
                        <CartContext>
                                {children}
                        </CartContext>
                    </UserProvider>
                </Provider>
                <Whatsapp />
            </body>
        </html>
    );
};
