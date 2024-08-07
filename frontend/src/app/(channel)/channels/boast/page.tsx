"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/navigation";
import BoastCard from '@/components/channel/boast/BoastCard';
import PostTitle from '@/components/channel/PostTitle';
import { fetchPosts } from '@/api/channel';
import { PostData } from '@/types/channelType';

const Boast: React.FC = () => {
   const [posts, setPosts] = useState<PostData[]>([]);
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
            const data = await fetchPosts(boastId, keyword, 0, sortCriteria);
            setPosts(data);
         } catch (error) {
            console.error('Failed to load boast list data:', error);
         }
      };

      loadData();
   }, [boastId, keyword, sortCriteria]);

   return (
      <>
         <PostTitle
            channelType="boast"
            onSearch={handleSearch}
            onSortChange={handleSortChange}
         />
         {posts.length === 0 ? (
            <CenteredMessage>
               게시글이 없습니다. 게시글을 작성해보세요!
            </CenteredMessage>
         ) : (
            <CardGrid>
               {posts.map((post) => (
                  <div key={post.board.id} onClick={() => handleCardClick(post.board.id)}>
                     <BoastCard
                        thumbnail={post.board.content}
                        viewer={post.board.viewCount}
                        likes={post.board.likeCount}
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
