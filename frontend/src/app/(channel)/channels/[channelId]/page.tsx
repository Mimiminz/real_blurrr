// /pages/channels/[channelId]/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ChannelPage = () => {
   const router = useRouter();
   const { channelId } = router.query;

   return (
      <Container>
         <Title>Channel Page</Title>
         <p>Welcome to the channel with ID: {channelId}</p>
      </Container>
   );
};

export default ChannelPage;
