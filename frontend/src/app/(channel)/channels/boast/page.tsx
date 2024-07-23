"use client";

import React from 'react';
import styled from 'styled-components';
import BoastCard from '../../../../components/channel/boast/BoastCard';
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

const Boast: React.FC = () => {
   return (
      <Container>
         <PostTitle
            channel="채널"
            subChannel="내 차 자랑"
            title="내 차를 자랑해보자"
         />
         <CardGrid>
            {dummy.carBoast.map((item) => (
               <div key={item.id} onClick={() => console.log("item pressed")}>
                  <BoastCard
                     thumbnail={item.thumbnail}
                     viewer={item.viewer}
                     likes={item.likes}
                  />
               </div>
            ))}
         </CardGrid>
      </Container>
   );
};

export default Boast;
