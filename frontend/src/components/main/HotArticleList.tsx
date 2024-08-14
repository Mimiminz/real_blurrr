import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HotArticleListItem from "@/components/main/HotArticleListItem";
import { HotBoardItem } from "@/types/mainPageTypes";

interface HotArticleListProps {
  hotBoards: HotBoardItem[];
}

const HotArticleList = ({ hotBoards }: HotArticleListProps) => {

  if (!hotBoards || hotBoards.length <= 0) {
    return <NoBoard>게시글이 없습니다. </NoBoard>;
  }
  return (
    <ArticleList>
      {hotBoards.map((board: HotBoardItem) => (
          <HotArticleListItem
            key={board.id}
            id={board.id}
            channel={board.channel}
            title={board.title}
            likeCount={board.likeCount}
            commentCount={board.commentCount}
          />
        ))}
    </ArticleList>
  );
};
const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoBoard = styled.div`
  margin-top: 30px;
`


export default HotArticleList;
