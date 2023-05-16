"use client";
import React, { useEffect, useContext } from 'react';
import useRouter from 'next/navigation';
import { UserContext } from '../../context/user';
import ResetForm from '../../components/ResetForm/ResetForm';

const resetpassword = () => {

  const { checkLogin } = useContext(UserContext);

  useEffect(() => {
    const check = async () => {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    }
    check();
  }, []);

  return (
    <div className="w-full h-screen bg-white pt-20 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold">Forgot Password</h1>
      <ResetForm />
    </div>
  );
}

export default resetpassword;