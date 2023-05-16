import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/app/context/user';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import Link from 'next/link';
import { motion } from 'framer-motion';

function LoginForm({setUserMenuIsOpen}) {

    const { setUser, doLogin, loggingIn, setLoggingIn } = useContext(UserContext);
    const { handleSubmit, register,  } = useForm();
    const [alert, setAlert] = useState(['', '']);


    const onSubmit = async (values) => {
        setLoggingIn(true);

        const res = await doLogin(values);

        if (res[0] == 'alert') {
            setAlert(res);
        } else {
            setUser(res.message.username);
            setUserMenuIsOpen(false);
        }
        setLoggingIn(false);
    };
    
    return (
        <motion.div animate={{opacity: 1}} initial={{opacity: 0}} className="flex flex-col w-full max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <input
                    className='border border-gray-300 rounded-md p-2 mb-2'
                    type='text'
                    name='username'
                    placeholder='Username'
                    {...register('identifier', {
                        required: true,
                    })}
                />
                <input
                    className='border border-gray-300 rounded-md p-2 mb-2'
                    type='password'
                    name='password'
                    placeholder='Password'
                    {...register('password', {
                        required: true,
                    })}
                />
                <button
                    className='bg-black text-center text-sm text-white uppercase font-bold flex items-center justify-center p-3 rounded-md mb-2'
                    type='submit'
                >
                    {loggingIn ? 'Logging in...' : 'Login'}
                </button>
                {alert[1]}
            </form>
            <hr />
            <button onClick={() => (window.location = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/google`)} className="text-center text-sm uppercase text-white bg-red-700 font-bold flex items-center justify-center p-3 rounded-md my-2">
                <BsGoogle size={20} color={'white'} className='pr-1' />Accedi con Google
            </button>
            <button  onClick={() =>(window.location = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/facebook`)} className="text-center text-sm uppercase text-white bg-blue-700 font-bold flex items-center justify-center p-3 rounded-md mb-2">
                <BsFacebook size={20} color={'white'} className='pr-1' />Accedi con Facebook
            </button>
            <hr />
            <Link href={"/user/forgot-password"} className="text-center text-gray-700 font-bold rounded-md my-2 text-xs">
                Password dimenticata
            </Link>
            <hr />
            <p className="text-gray-700 font-bold  rounded-md text-xs mt-2">
                Non hai un account?
            </p>
            <Link onClick={() => setUserMenuIsOpen(false)} href={"/user/register"} className="text-center text-sm uppercase bg-yellow-400 shadow font-bold flex items-center justify-center p-3 rounded-md">
                Registrati
            </Link>
        </motion.div>
    );
}

export default LoginForm;