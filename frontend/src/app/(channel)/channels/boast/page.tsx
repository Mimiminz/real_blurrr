"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/navigation";
import BoastCard from '@/components/channel/boast/BoastCard';
import PostTitle from '@/components/channel/PostTitle';
import { fetchBoast } from '@/api/channel';
import { Boasts } from '@/types/channelType';
import Loading from "@/components/common/UI/Loading";

const Boast: React.FC = () => {
   const [boasts, setBoasts] = useState<Boasts[]>([]);
   const [keyword, setKeyword] = useState('');
   const [sortCriteria, setSortCriteria] = useState('TIME');
   const router = useRouter();

   const boastId = process.env.NEXT_PUBLIC_BOAST_ID as string;

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

   const handleCardClick = (id: string) => {
      router.push(`/channels/${boastId}/${id}`);
   };

   useEffect(() => {
      const loadData = async () => {
         try {
            const data = await fetchBoast(keyword, 0, sortCriteria);
            setBoasts(data.content);
         } catch (error) {
            console.error('Failed to load boast list data:', error);
         }
      };

      loadData();
   }, [boastId, keyword, sortCriteria]);

   if (!boasts?.length) {
      return <Loading />;
   }

   return (
      <>
         <PostTitle
            channelType="boast"
            onSearch={handleSearch}
            onSortChange={handleSortChange}
         />
         {boasts.length === 0 ? (
            <CenteredMessage>
               게시글이 없습니다. 게시글을 작성해보세요!
            </CenteredMessage>
         ) : (
            <CardGrid>
               {boasts.map((boast) => (
                  <div key={boast.id} onClick={() => handleCardClick(boast.id)}>
                     <BoastCard
                        thumbnail={boast.thumbNail}
                        viewer={boast.viewCnt}
                        likes={boast.likeCnt}
                     />
                  </div>
               ))}
            </CardGrid>
         )}
      </>
   );
};

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
  height: 100vh; // 화면의 세로 중앙에 배치
  font-size: 18px;
  color: #555;
`;

export default Boast;
