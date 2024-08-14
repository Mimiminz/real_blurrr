import styled from "styled-components";
import BlackboxListItem from "./BlackboxListItem";
import dummy from "@/db/mainPageData.json";
import { DashCamItem } from "@/types/mainPageTypes";

interface DashcamBoardsListProps {
  dashcamBoards: DashCamItem[];
}

const HotArticleList = ({ dashcamBoards }: DashcamBoardsListProps) => {

  if (!dashcamBoards || dashcamBoards.length <= 0) {
    return <NoBoard>게시글이 없습니다. </NoBoard>;
  }
  return (
    <ArticleList>
      {dashcamBoards.map((article, index) => (
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

const NoBoard = styled.div`
  margin-top: 30px;
`


export default HotArticleList;
