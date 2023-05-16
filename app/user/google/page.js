
"use client";
import Loader from '@/app/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../context/user';

export default function googleCallback({searchParams}) {
  const [error, setError] = useState();
  const router = useRouter();
  const { doGoogleCallback, user, setUser } = useContext(UserContext);
  useEffect( () => {
    if (searchParams.access_token) {
      const check = async () => {
      const res = await doGoogleCallback({
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

  return <Loader />;
}