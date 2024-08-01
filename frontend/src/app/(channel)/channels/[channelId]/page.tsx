'use client';

import React, { useState } from 'react';
import ChannelBoardList from '@/components/channel/board/ChannelBoardList';
import PostTitle from '@/components/channel/PostTitle';

const ChannelBoardPage: React.FC = () => {
   const [keyword, setKeyword] = useState('');

   const handleSearch = (newKeyword: string) => {
      setKeyword(newKeyword);
   };

   return (
      <>
         <PostTitle
            channel="something"
            title="채널에 대한 설명 쓰는 공간입니다~"
            onSearch={handleSearch} // handleSearch를 PostTitle에 전달
         />
         <ChannelBoardList keyword={keyword} />
      </>
   );
};

export default ChannelBoardPage;
