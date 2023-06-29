import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/app/context/user';

const ForgotForm = () => {

    const { doRemind } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(['', '']);

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        const ret = await doRemind(values);
        if (ret[0] === 'alert') {
            setAlert(ret);
        } else {
            setAlert(['', `Please check your email (${values.email}) and follow the instructions to reset your password`]);
            reset();
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col w-full max-w-lg m-auto my-5">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <input
                    type="email"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    {...register('email', {
                        required: 'Email is required',
                        pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    placeholder="Email"
                />
                {errors.email && <p>{errors.email.message}</p>}
                <button
                    type="submit"
                    className="background-first-color text-center text-sm text-white uppercase font-bold flex items-center justify-center p-3 rounded-md mb-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting && 'Registering...'}
                    {!isSubmitting && 'Register'}
                </button>
                {alert[1]}
            </form>
        </div>
    );
};

export default ForgotForm;