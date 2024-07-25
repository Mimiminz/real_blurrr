'use client';

import React from 'react';
import ChannelBoardList from '@/components/channel/board/ChannelBoardList';
import PostTitle from '@/components/channel/PostTitle';

const ChannelBoardPage: React.FC = () => {
   return (
      <><PostTitle channel="something" title="채널에 대한 설명 쓰는 공간입니다~" /><ChannelBoardList /></>
   );
}

export default ChannelBoardPage;
