"use client";
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { CartContext } from '@/app/context/cart';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import UserProvider from '@/app/context/user';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    display: 'swap'
});

const client = new Client({
    url: process.env.NEXT_PUBLIC_BACKEND_API,
    exchanges: [cacheExchange, fetchExchange],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider value={client}>
                    <UserProvider>
                        <CartContext>
                                {children}
                        </CartContext>
                    </UserProvider>
                </Provider>
            </body>
        </html>
    );
};
