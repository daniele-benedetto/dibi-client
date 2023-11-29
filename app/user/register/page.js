"use client";
import React, { useEffect, useContext } from 'react';
import { UserContext } from '@/app/context/user';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/app/components/RegisterForm/RegisterForm';
import { useQuery } from "urql";
import { GENERAL_QUERY } from "@/app/lib/query";
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Loader from '@/app/components/Loader/Loader';
import Error from 'next/error';

function Register() {
    const { user, checkLogin } = useContext(UserContext);
    const router = useRouter();

    useEffect( () => {
        const check = async () => {
            const res = await checkLogin();
                
            if (res && res.status === 200) {
                console.log('Logged in');
            }
        }
        check();
    }, []);

    if (user) {
        router.push('/');
    }

    const [results] = useQuery({
        query: GENERAL_QUERY,
    });

    const { data, fetching, error } = results;

    if(fetching) return <Loader />;
    if(error) return Error();
    
    return (
        <>
            {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
            {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} categories={data.categories.data} />}
            <main className="w-full h-screen bg-white p-5 pt-20">
                <div className='max-w-6xl m-auto flex flex-col items-center flex-center p-1'>
                    <h5 className='text-center text-md font-thin uppercase'>Compila il form e registrati</h5>
                    <RegisterForm /> 
                </div>
            </main>
            {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
        </>
    );
}

export default Register;