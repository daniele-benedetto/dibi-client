"use client";
import React, { useEffect, useContext } from 'react';
import { UserContext } from '@/app/context/user';
import ResetForm from '@/app/components/ResetForm/ResetForm';
import { useQuery } from "urql";
import { useRouter } from 'next/navigation';
import { GENERAL_QUERY } from "@/app/lib/query";
import Topbar from '@/app/components/Topbar/Topbar';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Loader from '@/app/components/Loader/Loader';
import Error from 'next/error';

const resetpassword = () => {

  const { checkLogin } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await checkLogin();
      if (res && res.status === 200) {
      }
    }
    check();
  }, []);

  const [results] = useQuery({
      query: GENERAL_QUERY,
      staleTime: 60000
  });

  const { data, fetching, error } = results;

  if(fetching) return <Loader />;
  if(error) return Error();

  return (
    <>
      {data?.general?.data.attributes.top_bar && <Topbar topbar={data.general.data.attributes.top_bar} />}
      {data?.general?.data.attributes.navbar && <Navbar navbar={data.general.data.attributes.navbar} categories={data.categories.data} />}
      <main className="w-full h-screen bg-white pt-20 flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold">Reset Password</h1>
        <ResetForm />
      </main>
      {data?.general?.data.attributes.footer && <Footer footerServizioClienti={data.general.data.attributes.footer.footerServizioClienti} footerAbout={data.general.data.attributes.footer.footerAbout} footerSocial={data.general.data.attributes.footer.footerSocial} />}
    </>
  );
}

export default resetpassword;