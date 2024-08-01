"use client"

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
   const [keyword, setKeyword] = useState('');
   const [sortCriteria, setSortCriteria] = useState('TIME');

   const router = useRouter();

   const handleSortChange = (newSort: string) => {
      // 정렬 기준을 변경하고, API에서 사용할 수 있는 형식으로 변환
      const criteriaMap: { [key: string]: string } = {
         '최신순': 'TIME',
         '댓글수': 'COMMENT',
         '조회수': 'VIEW',
         '좋아요': 'LIKE'
      };

      const newCriteria = criteriaMap[newSort] || 'TIME'; // 매핑되지 않는 경우 기본값 설정
      setSortCriteria(newCriteria);
   };

   const handleSearch = (newKeyword: string) => {
      setKeyword(newKeyword);
   };

   useEffect(() => {
      const loadData = async () => {
         try {
            const data = await fetchDashCams(0, 'TIME');
            setDashCams(data);
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
         <PostTitle
            channel="dashcam"
            title="다양한 블랙박스 영상을 보고 직접 투표하자"
            onSearch={handleSearch}
            onSortChange={handleSortChange}
         />
         <CardGrid>
            {dashCams.map((dashCam) => (
               <div key={dashCam.id} onClick={() => handleCardClick(dashCam.id)}>
                  <DashCamCard
                     dashCamTitle={dashCam}  // DashCamCard가 dashCamTitle prop을 필요로 하는지 확인
                  />
               </div>
            ))}
         </CardGrid>
      </Container>
   );
};

export default DashCam;
