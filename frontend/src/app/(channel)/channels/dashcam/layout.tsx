"use client";

import React from 'react';
import styled from 'styled-components';
import Breadcrumb from '@/components/common/UI/BreadCrumb';

const BreadcrumbContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 16px;
`;

interface LayoutProps {
   children: React.ReactNode;
}

const DashCamLayout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <>
         <BreadcrumbContainer>
            <Breadcrumb channel="채널" subChannel="블랙박스" channelUrl="/channels" subChannelUrl="/channels/dashcam" />
         </BreadcrumbContainer>
         {children}
      </>
   );
};

export default DashCamLayout;
