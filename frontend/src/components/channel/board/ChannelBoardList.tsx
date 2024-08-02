import styled from "styled-components";

import React, { useEffect, useState } from 'react';
import ChannelBoardListItem from "@/components/channel/board/ChannelBoardListItem";
import { fetchPosts } from '@/api/channel';
import { PostData } from '@/types/channelType';
import { useRouter } from "next/navigation";

interface ChannelBoardListProps {
  channelId: string;
  keyword: string; // keyword를 props로 받음
  criteria: string;
}

const ChannelBoardList: React.FC<ChannelBoardListProps> = ({ channelId, keyword, criteria }) => {
  const [Posts, setPosts] = useState<PostData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPosts(channelId, keyword, 0, criteria);
        setPosts(data);
        console.log('Posts loaded:', data);
      } catch (error) {
        console.error('Failed to load channel board list data:', error);
      }
    };

    loadData();
  }, [keyword, criteria, channelId]);

  const handlePostClick = (channelId: string, boardId: string) => {
    router.push(`/channels/${channelId}/${boardId}`);
  };

  return (
    <ChannelList>
      {Posts.map((post) => (
        <ChannelBoardListItem
          key={post.board.id}
          post={post.board}
          mentions={post.mentionedLeagues}
          onClick={() => handlePostClick(channelId, post.board.id)}
        />
      ))}

    </ChannelList>
  );
};
const ChannelList = styled.div``;

export default ChannelBoardList;
