import styled from "styled-components";
import BlackboxListItem from "./BlackboxListItem";
import dummy from "@/db/mainPageData.json";
import { DashCamItem } from "@/types/mainPageTypes";

interface DashcamBoardsListProps {
  dashcamBoards: DashCamItem[];
}

const HotArticleList = ({ dashcamBoards }: DashcamBoardsListProps) => {
  return (
    <ArticleList>
      {dashcamBoards.length > 0 && dashcamBoards.map((article, index) => (
        <BlackboxListItem
          key={index}
          id={article.id}
          title={article.title}
          totalVotes={article.voteCount}
          optionNumber={article.optionCount}
          options={article.options}
        />
      ))}
    </ArticleList>
  );
};

const ArticleList = styled.div``;

export default HotArticleList;
