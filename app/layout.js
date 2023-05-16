"use client";
import './globals.css';
import { Inter } from 'next/font/google';
import Topbar from './components/Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { footerAbout, footerServizioClienti, footerSocial, navbar, topbar} from './lib/const';
import { CartContext } from './context/cart';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import UserProvider from './context/user';

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
                                <Topbar topbar={topbar} />
                                <Navbar navbar={navbar} />
                                {children}
                                <Footer footerServizioClienti={footerServizioClienti} footerSocial={footerSocial} footerAbout={footerAbout} />
                        </CartContext>
                    </UserProvider>
                </Provider>
            </body>
        </html>
    );
};
