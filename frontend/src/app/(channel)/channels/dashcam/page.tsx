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

  /* 핸드폰 설정 */
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }

  /* 태블릿 크기 이상 설정 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  /* 데스크탑 크기 이상 설정 */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  /* 큰 데스크탑 크기 이상 설정 */
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
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
