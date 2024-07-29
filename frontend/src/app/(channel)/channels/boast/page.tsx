"use client";

import React from 'react';
import styled from 'styled-components';
import BoastCard from '@/components/channel/boast/BoastCard';
import PostTitle from '@/components/channel/PostTitle';
import dummy from "@/db/data.json";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Boast: React.FC = () => {

   return (
      <>
         <PostTitle
            channel="boast"
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
      </>
   );
};

export default Boast;
