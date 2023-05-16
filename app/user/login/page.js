"use client";
import React, { useEffect, useContext } from 'react';
import { UserContext } from '@/app/context/user';
import LoginForm from '@/app/components/LoginForm/LoginForm';
import { useRouter } from 'next/navigation';

function Login() {
    const { checkLogin } = useContext(UserContext);
    const router = useRouter();

    useEffect( () => {
        const check = async () => {
            const res = await checkLogin();
                
            if (res.status === 200) {
                router.push('/user');
            }
        }
        check();
    }, []);

    return (
        <div className="w-full h-screen bg-white p-5 pt-20">
            <div className='max-w-6xl m-auto flex flex-col items-center flex-center md:p-5 p-1'>
                <h5 className='text-center text-md font-thin uppercase'>Inserisci la tua email e la tua password</h5>
                <LoginForm /> 
            </div>
        </div>
    );
}

export default Login;