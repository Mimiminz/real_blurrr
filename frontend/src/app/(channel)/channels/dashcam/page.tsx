"use client";

import React from 'react';
import styled from 'styled-components';
import DashCamCard from '../../../../components/channel/dashcam/DashCamCard';
import PostTitle from '../../../../components/channel/PostTitle';
import dummy from "../../../../db/data.json";

const Container = styled.div`
  margin: 10px 20px; /* 기본 마진 설정 */
  
  @media (min-width: 768px) {
    margin: 30px 100px; /* 태블릿 크기 이상일 때 */
  }

  @media (min-width: 1024px) {
    margin: 50px 150px; /* 데스크탑 크기 이상일 때 */
  }

  @media (min-width: 1440px) {
    margin: 70px 300px; /* 큰 데스크탑 크기 이상일 때 */
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const DashCam: React.FC = () => {
   return (
      <Container>
         <PostTitle
            channel="채널"
            subChannel="블랙박스 채널"
            channelUrl="/channels"
            title="다양한 블랙박스 영상을 보고 직접 투표하자"
         />
         <CardGrid>
            {dummy.dashCamList.map((item) => (
               <div key={item.title} onClick={() => console.log("item pressed")}>
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
