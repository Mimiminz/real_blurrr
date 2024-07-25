"use client";

import React from 'react';
import styled from 'styled-components';
import { useRouter } from "next/navigation";
import DashCamCard from '@/components/channel/dashcam/DashCamCard';
import PostTitle from '@/components/channel/PostTitle';
import dummy from "@/db/data.json";

const Container = styled.div``;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const DashCam: React.FC = () => {
   const router = useRouter(); // useRouter 훅 사용

   const handleCardClick = (id: number) => {
      router.push(`/channels/dashcam/${id}`);
   };

   return (
      <Container>
         <PostTitle channel="dashcam" title="다양한 블랙박스 영상을 보고 직접 투표하자" />
         <CardGrid>
            {dummy.dashCamList.map((item) => (
               <div key={item.id} onClick={() => handleCardClick(item.id)}>
                  <DashCamCard
                     thumbnail={item.thumbnail}
                     tags={item.tags}
                     title={item.title}
                     viewer={item.viewer}
                     likes={item.likes}
                     createdDate={item.createdDate}
                  />
               </div>
            ))}
         </CardGrid>
      </Container>
   );
};

export default DashCam;
