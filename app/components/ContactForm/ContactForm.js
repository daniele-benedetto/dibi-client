"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import Toast from '@/app/components/Toast/Toast';

function ContactForm() {

    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(['', '']);
    const [toast, setToast] = useState(false);

    const onSubmit = async (values) => {
        setIsSubmitting(true);

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ data:{
                name: values.nome,
                surname: values.cognome,
                email: values.email,
                message: values.messaggio
            }})
        })
        .then(async (result) => {
            const res = await result.json();
            console.log(res);
            await fetch('/api/mail/contact', {
                method: 'POST',
                body: JSON.stringify({ id: res.data.id })
            }).then((result) => {
                setToast(true);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
        setIsSubmitting(false);
    };

    useEffect(() => {
        reset();
        toast && setTimeout(() => {
            setToast(false);
        }, 3000);
    }, [toast]);

    return (
        <div className="flex flex-col w-full">
            { toast && <Toast type={'success'} text='Il tuo messaggio è stato inviato con successo! Ti ricontatteremo al più presto' setToast={setToast} /> }
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('nome', {
                        required: 'Questo campo è obbligatorio',
                    })}
                    placeholder="Nome"
                />
                {errors.nome && <p>{errors.nome.message}</p>}
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('cognome', {
                        required: 'Questo campo è obbligatorio',
                    })}
                    placeholder="Cognome"
                />
                {errors.cognome && <p>{errors.cognome.message}</p>}
                <input
                    type="email"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('email', {
                        required: 'Questo campo è obbligatorio',
                        pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    placeholder="Email"
                />
                {errors.email && <p>{errors.email.message}</p>}
                <textarea
                    type="text"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('messaggio', {
                        required: 'Questo campo è obbligatorio',
                    })}
                    placeholder="Messaggio"
                    rows={5}
                />
                <div className="flex items-center w-full">
                    <input 
                        type="checkbox"
                        {...register('privacy', {
                        validate: (value) =>
                            value === true || 'Devi accettare la privacy policy per registrarti',
                        })}
                        className="border border-gray-300 rounded-md p-2 mb-2 w-5 h-5"
                    />
                    <p className="mb-3 ml-3">Accetta la <Link href="/privacy-policy">privacy policy</Link> per registrarti</p>
                </div>
                {errors.privacy && <p>{errors.privacy.message}</p>}
                <button
                    type="submit"
                    className="background-first-color text-center text-sm text-white uppercase font-bold flex items-center justify-center p-3 rounded-md mb-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting && 'Invio in corso...'}
                    {!isSubmitting && 'Invia'}
                </button>
                {alert[1]}
            </form>
        </div>
    );
}

export default ContactForm;