"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/navigation";
import DashCamCard from '@/components/channel/dashcam/DashCamCard';
import PostTitle from '@/components/channel/PostTitle';
import { fetchDashCams } from '@/api/channel';
import { DashCams } from '@/types/channelType';

const Container = styled.div``;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
`;

const DashCam: React.FC = () => {
   const [dashCams, setDashCams] = useState<DashCams[]>([]);
   const router = useRouter();

   useEffect(() => {
      const loadData = async () => {
         try {
            const data = await fetchDashCams(0, 'createdAt');
            if (Array.isArray(data)) {
               setDashCams(data); // 데이터가 배열인지 확인
            } else {
               console.error('API did not return an array:', data);
            }
         } catch (error) {
            console.error('Failed to load dash cam data:', error);
         }
      };

      loadData();
   }, []);

   const handleCardClick = (id: string) => {
      router.push(`/channels/dashcam/${id}`);
   };

   return (
      <Container>
         <PostTitle channel="dashcam" title="다양한 블랙박스 영상을 보고 직접 투표하자" />
         <CardGrid>
            {dashCams.map((dashCam) => (
               <div key={dashCam.id} onClick={() => handleCardClick(dashCam.id)}>
                  <DashCamCard
                     dashCamTitle={dashCam}
                  />
               </div>
            ))}
         </CardGrid>
      </Container>
   );
};

export default DashCam;
