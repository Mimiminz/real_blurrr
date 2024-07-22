'use client'

import React from 'react'
import LoginForm from '../../../components/login/LoginForm';
import Head from 'next/head';

type Props = {}

const login = (props: Props) => {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <div>
        <LoginForm />
      </div>
    </>
  )
}

export default login