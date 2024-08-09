'use client';

import React, { useState } from 'react';
import ChannelBoardList from '@/components/channel/board/ChannelBoardList';
import PostTitle from '@/components/channel/PostTitle';

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
