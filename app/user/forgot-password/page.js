"use client";
import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/user';
import ForgotForm from '../../components/ForgotPassword/ForgotPassword';

const forgotpassword = () => {
  const { checkLogin } = useContext(UserContext);
  useEffect(() => {
    const check = async () => {
        const res = await checkLogin();
        if (res.status === 200) {
          console.log('Logged in')
        }
    }
    check();
  }, []);

  return (
    <div className="w-full h-screen bg-white pt-20 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold">Forgot Password</h1>
      <ForgotForm /> 
    </div>
  );
}


export default forgotpassword;