"use client";
import { UserContext } from '@/app/context/user';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

function RegisterForm() {
    const { doRegister } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const password = {};
    password.current = watch('password', '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(['', '']);

    const onSubmit = async (values) => {
        setIsSubmitting(true);

        const ref = await doRegister(values);

        if (ref[0] === 'alert') {
            setAlert(ref);
        } else {
            setAlert(ref);
        reset();
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col w-full max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('username', {
                        required: 'Per favore inserisci un username',
                    })}
                    placeholder="Username"
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                    type="email"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('email', {
                        required: "Per favore inserisci un'email",
                        pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    placeholder="Email"
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    {...register('password', {
                        required: 'Per favore inserisci una password',
                        minLength: { value: 8, message: 'La password deve essere lunga almeno 8 caratteri' },
                    })}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    placeholder="Password"
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    type="password"
                    {...register('repeatpassword', {
                    validate: (value) =>
                        value === password.current || 'La password non corrisponde',
                    })}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    placeholder="Ripeti password"
                />
                {errors.repeatpassword && <p>{errors.repeatpassword.message}</p>}
                <div className="flex items-center w-full">
                    <input 
                        type="checkbox"
                        {...register('privacy', {
                        validate: (value) =>
                            value === true || 'Devi accettare la privacy policy per registrarti',
                        })}
                        className="border border-gray-300 rounded-md p-2 mb-2 w-5 h-5"
                    />
                    <p className="mb-3 ml-3">Accetta la <Link href="/page/privacy-policy">privacy policy</Link> per registrarti</p>
                </div>
                {errors.privacy && <p>{errors.privacy.message}</p>}
                <button
                    type="submit"
                    className="background-first-color text-center text-sm text-white uppercase font-bold flex items-center justify-center p-3 rounded-md mb-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting && 'Registrazione in corso...'}
                    {!isSubmitting && 'Registrati'}
                </button>
                {alert[1]}
            </form>
            <hr />
            <p className="text-gray-700 font-bold  rounded-md text-xs mt-2">
                Hai già un account?
            </p>
            <Link onClick={() => setUserMenuIsOpen(false)} href={"/user/login"} className="text-center text-sm uppercase background-second-color shadow text-white font-bold flex items-center justify-center p-3 rounded-md">
                Accedi
            </Link>
        </div>
    );
}

export default RegisterForm;