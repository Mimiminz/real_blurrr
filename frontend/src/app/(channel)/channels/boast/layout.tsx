"use client";

import React from 'react';
import styled from 'styled-components';
import Breadcrumb from '@/components/common/UI/BreadCrumb';

const LayoutContainer = styled.div`
  padding: 10px 16px;  // 패딩 추가
`;

const BreadcrumbContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 16px;
`;

interface LayoutProps {
   children: React.ReactNode;
}

const ChannelLayout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <LayoutContainer>
         <BreadcrumbContainer>
            <Breadcrumb channel="채널" subChannel="내 차 자랑" channelUrl="/channels" />
         </BreadcrumbContainer>
         {children}
      </LayoutContainer>
   );
};

export default ChannelLayout;
