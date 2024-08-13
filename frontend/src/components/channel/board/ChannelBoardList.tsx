import styled from "styled-components";

import React, { useEffect, useState } from "react";
import ChannelBoardListItem from "@/components/channel/board/ChannelBoardListItem";
import PaginationComponent from "@/components/common/UI/Pagination";
import { fetchPosts } from "@/api/channel";
import { PostData } from "@/types/channelType";
import { useRouter } from "next/navigation";

interface ChannelBoardListProps {
  channelId: string;
  keyword: string; // keyword를 props로 받음
  criteria: string;
}

const ChannelBoardList: React.FC<ChannelBoardListProps> = ({
  channelId,
  keyword,
  criteria,
}) => {
  const [Posts, setPosts] = useState<PostData[]>([]);
  const router = useRouter();

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        if(keyword){
          setTotalPages(0);
        }
        const data = await fetchPosts(
          channelId,
          keyword,
          currentPage - 1,
          criteria
        );
        if (data) {
          setPosts(data.content);
          setTotalPages(data.totalPages);
        } else {
          setPosts([]);
        }
        console.log("Posts loaded:", data);
      } catch (error) {
        console.error("Failed to load channel board list data:", error);
      }
    };

    loadData();
  }, [keyword, criteria, channelId, currentPage]);

  const handlePostClick = (channelId: string, boardId: string) => {
    router.push(`/channels/${channelId}/${boardId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ChannelList>
      {Posts && Posts.length === 0 ? (
        <EmptyMessage>게시글이 없습니다.</EmptyMessage>
      ) : (
        Posts.map((post) => (
          <ChannelBoardListItem
            key={post.board.id}
            post={post.board}
            mentions={post.mentionedLeagues}
            onClick={() => handlePostClick(channelId, post.board.id)}
          />
        ))
      )}
      {totalPages > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </ChannelList>
  );
};
const ChannelList = styled.div``;

const EmptyMessage = styled.p`
  padding: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;

export default ChannelBoardList;
