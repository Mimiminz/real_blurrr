import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HotArticleListItem from "@/components/main/HotArticleListItem";
import { HotBoardItem } from "@/types/mainPageTypes";

interface HotArticleListProps {
  hotBoards: HotBoardItem[];
}

const HotArticleList = ({ hotBoards }: HotArticleListProps) => {
  const [displayBoards, setDisplayBoards] = useState<HotBoardItem[]>(hotBoards);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayBoards(hotBoards.slice(0, 5));
      } else {
        setDisplayBoards(hotBoards);
      }
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hotBoards]);

  return (
    <ArticleList>
      {hotBoards.slice(0, 6).map((board: HotBoardItem) => (
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
const ArticleList = styled.div``;

export default HotArticleList;
