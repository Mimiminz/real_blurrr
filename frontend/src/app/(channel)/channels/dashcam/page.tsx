"use client"

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/navigation";
import DashCamCard from '@/components/channel/dashcam/DashCamCard';
import PostTitle from '@/components/channel/PostTitle';
import { fetchDashCams } from '@/api/channel';
import { DashCamList } from '@/types/channelType';
import Loading from "@/components/common/UI/Loading";

const DashCamPage: React.FC = () => {
   const [dashCams, setDashCams] = useState<DashCamList>();
   const [keyword, setKeyword] = useState('');
   const [sortCriteria, setSortCriteria] = useState('TIME');

   const router = useRouter();

   const handleSortChange = (newSort: string) => {
      const criteriaMap: { [key: string]: string } = {
         '최신순': 'TIME',
         '댓글수': 'COMMENT',
         '조회수': 'VIEW',
         '좋아요': 'LIKE'
      };

      const newCriteria = criteriaMap[newSort] || 'TIME';
      setSortCriteria(newCriteria);
   };

   const handleSearch = (newKeyword: string) => {
      setKeyword(newKeyword);
   };

   const loadData = useCallback(async () => {
      try {
         const data = await fetchDashCams(keyword, 0, sortCriteria);
         setDashCams(data);
      } catch (error) {
         console.error('Failed to load dash cam data:', error);
      }
   }, [keyword, sortCriteria]);

   useEffect(() => {
      loadData();
   }, [loadData]);

   const handleCardClick = (dashCamDetailId: string) => {
      router.push(`/channels/dashcam/${dashCamDetailId}`);
   };

   if (!dashCams?.content.length) {
      return <Loading />;
   }

   return (
      <Container>
         <PostTitle
            channelType="dashcam"
            onSearch={handleSearch}
            onSortChange={handleSortChange}
         />
         {!dashCams ? (
            <CenteredMessage>로딩 중...</CenteredMessage>
         ) : dashCams.content.length === 0 ? (
            <CenteredMessage>게시글이 없습니다. 게시글을 작성해보세요!</CenteredMessage>
         ) : (
            <CardGrid>
               {dashCams.content.map((dashCam) => (
                  <div key={dashCam.id} onClick={() => handleCardClick(dashCam.id)}>
                     <DashCamCard
                        dashCamTitle={dashCam}
                     />
                  </div>
               ))}
            </CardGrid>
         )}
      </Container>
   );
};

const Container = styled.div`
  padding: 20px;
`;

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

const CenteredMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #555;
`;

export default DashCamPage;
