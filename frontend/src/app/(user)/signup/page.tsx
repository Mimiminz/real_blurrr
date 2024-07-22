'use client'

import React from 'react'
import SignupForm from '../../../components/signup/SignupForm';
import Head from 'next/head';


const SignupPage = () => {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <div>
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage