"use client";
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '@/app/context/user';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader/Loader';

export default function facebookCallback({searchParams}) {
  const router = useRouter();
  const [error, setError] = useState();
  const { doFacebookCallback, user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (searchParams.access_token) {
      const check = async () => {
        const res = await doFacebookCallback({
          access_token: searchParams.access_token,
        });
        if (res[0] === 'alert') {
          setError(res[1]);
        }
        setUser(res[1].username); 
      }
      check();
    }
  }, [router]);

  if (user) {
    router.push('/');
  }
  if (error) {
    router.push(`/?msg=${error}`);
  }

  return <Loader />;}