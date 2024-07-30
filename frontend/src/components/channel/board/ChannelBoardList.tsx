import styled from "styled-components";

import React, { useEffect, useState } from 'react';
import ChannelBoardListItem from "@/components/channel/board/ChannelBoardListItem";
import { fetchPosts } from '@/api/channel';
import { PostData } from '@/types/channelType';

const ChannelBoardList = () => {
  const [Posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPosts('11ef4e3b-36d9-9292-a7f5-1d7ed3babb22', 0, 'TIME');
        setPosts(data);
      } catch (error) {
        console.error('Failed to load dash cam data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <ChannelList>
      {Posts.map((post) => (
        <ChannelBoardListItem key={post.id} post={post} />
      ))}

    </ChannelList>
  );
};
const ChannelList = styled.div``;

export default ChannelBoardList;
