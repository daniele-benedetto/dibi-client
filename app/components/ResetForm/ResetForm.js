import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/app/context/user';
import { useRouter } from 'next/navigation';

const ResetForm = () => {
  const { push, query } = useRouter();
  const { doReset } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = {};
  password.current = watch('password', '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(['', '']);

  const onSubmit = async (values) => {
    values.code = query.code;
    setIsSubmitting(true);
    const ret = await doReset(values);
    if (ret[0] === 'alert') {
      setAlert(ret);
    } else {
      setAlert([
        '',
        `Your password has been changed, you will be redirect to login`,
      ]);
      setTimeout(() => {
        push('/user/login');
      }, 3000);
      reset();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full max-w-lg">
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <input
            type="password"
            {...register('password', {
                required: 'You must specify a password',
                minLength: { value: 8, message: 'At least 8 character' },
            })}
            className="border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
            type="password"
            {...register('repeatpassword', {
            validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
            className="border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Repeat password"
        />
        {errors.repeatpassword && <p>{errors.repeatpassword.message}</p>}
        <button
            type="submit"
            className="bg-black text-center text-sm text-white uppercase font-bold flex items-center justify-center p-3 rounded-md mb-2"
            disabled={isSubmitting}
        >
            {isSubmitting && 'Reset...'}
            {!isSubmitting && 'Reset'}
        </button>
        {alert[1]}
    </form>
</div>
  );
};

export default ResetForm;