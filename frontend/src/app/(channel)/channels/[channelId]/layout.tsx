"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Breadcrumb from '@/components/common/UI/BreadCrumb';
import { useChannelStore } from '@/store/channelStore';

const BreadcrumbContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 16px;
`;

interface LayoutProps {
   children: React.ReactNode;
}

const ChannelLayout: React.FC<LayoutProps> = ({ children }) => {
   const [isClient, setIsClient] = useState(false);

   const channelName = useChannelStore((state) => state.channelName);
   const channelId = useChannelStore((state) => state.channelId);
   const boastId = process.env.NEXT_PUBLIC_BOAST_ID;

   const subChannelUrl = channelId === boastId
      ? `/channels/boast`
      : `/channels/${channelId}`;

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
      <>
         <BreadcrumbContainer>
            {isClient ? (
               <Breadcrumb
                  channel="채널"
                  subChannel={channelName || "임시 채널"}
                  channelUrl="/channels"
                  subChannelUrl={subChannelUrl}
               />
            ) : (
               <Breadcrumb
                  channel="채널"
                  subChannel="로딩 중..."
                  channelUrl="/channels"
                  subChannelUrl="#"
               />
            )}
         </BreadcrumbContainer>
         {children}
      </>
   );
};

export default ChannelLayout;
