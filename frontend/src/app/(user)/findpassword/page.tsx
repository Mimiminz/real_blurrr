'use client'

import React from 'react';
import Head from 'next/head';
import FindPasswordForm from '@/components/findpassword/FindPasswordForm';
import ChangePasswordForm from '@/components/findpassword/ChangePasswordForm';

type Props = {}

const findpassword = (props: Props) => {
  return (
    <div>
        <FindPasswordForm></FindPasswordForm>
        <ChangePasswordForm></ChangePasswordForm>
    </div>
  )
}

export default findpassword