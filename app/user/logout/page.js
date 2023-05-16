"use client";
import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/user';
import Loader from '@/app/components/Loader/Loader';
import { useRouter } from 'next/navigation';

const forgotpassword = () => {

  const { doLogout } = useContext(UserContext);
  const router = useRouter();
 
  useEffect(() => {
    const logout = async () => {
      await doLogout();
      router.push('/');
    }
    logout();
  }, []);

  return <Loader />;
};

export default forgotpassword;