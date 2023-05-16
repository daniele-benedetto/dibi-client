"use client";
import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegisterForm from '@/app/components/RegisterForm/RegisterForm';

function Register() {
    const { user, checkLogin } = useContext(UserContext);
    const router = useRouter();

    useEffect( () => {
        const check = async () => {
            const res = await checkLogin();
                
            if (res.status === 200) {
                console.log('Logged in');
            }
        }
        check();
    }, []);

    if (user) {
        router.push('/');
    }
    
    return (
        <div className="w-full h-screen bg-white p-5 pt-20">
            <div className='max-w-6xl m-auto flex flex-col items-center flex-center p-1'>
                <h5 className='text-center text-md font-thin uppercase'>Compila il form e registrati</h5>
                <RegisterForm /> 
            </div>
        </div>
    );
}

export default Register;