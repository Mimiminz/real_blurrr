"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/navigation";
import BoastCard from '@/components/channel/boast/BoastCard';
import PostTitle from '@/components/channel/PostTitle';
import { fetchBoast } from '@/api/channel';
import { Boasts } from '@/types/channelType';
import PaginationComponent from "@/components/common/UI/Pagination";
import Loading from "@/components/common/UI/Loading";

const Boast: React.FC = () => {
   const [boasts, setBoasts] = useState<Boasts[]>([]);
   const [keyword, setKeyword] = useState('');
   const [sortCriteria, setSortCriteria] = useState('TIME');
   const router = useRouter();

   // 페이지네이션 상태
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);

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

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가


   useEffect(() => {
      const loadData = async () => {
         try {
            const data = await fetchBoast(keyword, currentPage - 1, sortCriteria);
            if (data) {
               setBoasts(data.content);
            } else {
               setBoasts([]);
            }
         } catch (error) {
            console.error('Failed to load boast list data:', error);
         }
      };

      loadData();
   }, [boastId, keyword, sortCriteria]);

   useEffect(() => {
      setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
   }, []);

   if (!isMounted) {
      return <Loading />;
   }

   return (
      <>
         <PostTitle
            channelType="boast"
            onSearch={handleSearch}
            onSortChange={handleSortChange}
         />
         {boasts && boasts.length === 0 ? (
            <EmptyMessage>게시글이 없습니다.<br />직접 글을 작성해보세요!</EmptyMessage>
         ) : (
            <CardGrid>
               {boasts.map((boast) => (
                  <div key={boast.id} onClick={() => handleCardClick(boast.id)}>
                     <BoastCard
                        boast={boast}
                     />
                  </div>
               ))}
            </CardGrid>
         )}
         <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
         />
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

const EmptyMessage = styled.p`
  padding: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;

export default Boast;
