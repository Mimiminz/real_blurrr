'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChannelBoardList from '@/components/channel/board/ChannelBoardList';
import PostTitle from '@/components/channel/PostTitle';
import { fetchChannelInfo } from '@/api/channel';
import { PostInfo } from '@/types/channelType';
import { useChannelStore } from '@/store/channelStore';

interface PageProps {
   params: {
      channelId: string;
   };
}

const ChannelBoardPage: React.FC<PageProps> = ({ params }) => {
   const { channelId } = params;

   const [keyword, setKeyword] = useState('');
   const [sortCriteria, setSortCriteria] = useState('TIME');
   const [channelInfo, setChannelInfo] = useState<PostInfo | null>(null);

   const setChannelName = useChannelStore((state) => state.setChannelName);
   const setChannelId = useChannelStore((state) => state.setChannelId);

   useEffect(() => {
      const getChannelInfo = async () => {
         try {
            const info = await fetchChannelInfo(channelId);
            setChannelInfo(info);
            setChannelName(info.name);
            setChannelId(channelId);
         } catch (error) {
            console.error('Error fetching channel info:', error);
         }
      };

      getChannelInfo();
   }, [channelId, setChannelName]);

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

   return (
      <>
         {channelInfo && (
            <PostTitle
               channel={channelId}
               title={channelInfo.info}
               onSearch={handleSearch}
               onSortChange={handleSortChange}
            />
         )}
         <ChannelBoardList channelId={channelId} keyword={keyword} criteria={sortCriteria} />
      </>
   );
};

export default ChannelBoardPage;
