'use client';

import React, { useState, useEffect } from 'react';
import ChannelBoardList from '@/components/channel/board/ChannelBoardList';
import PostTitle from '@/components/channel/PostTitle';
import Loading from "@/components/common/UI/Loading";

interface PageProps {
   params: {
      channelId: string;
   };
}

const ChannelBoardPage: React.FC<PageProps> = ({ params }) => {
   const { channelId } = params;

   const [keyword, setKeyword] = useState('');
   const [sortCriteria, setSortCriteria] = useState('TIME');

   const handleSortChange = (newSort: string) => {
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

   const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가

   useEffect(() => {
      setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
   }, []);

   if (!isMounted) {
      return <Loading />;
   }

   return (
      <>
         <PostTitle
            channelType={channelId}
            onSearch={handleSearch}
            onSortChange={handleSortChange}
         />
         <ChannelBoardList channelId={channelId} keyword={keyword} criteria={sortCriteria} />
      </>
   );
};

export default ChannelBoardPage;
