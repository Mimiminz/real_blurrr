import styled from "styled-components";
import BlackboxListItem from "./BlackboxListItem";
import dummy from "@/db/mainPageData.json";

const HotArticleList = () => {
  return (
    <ArticleList>
      {dummy.Blackbox.map((article, index) => (
        <BlackboxListItem
          key={index}
          title={article.title}
          totalVotes={article.totalVotes}
          optionNumber={article.optionNumber}
          options={article.options}
        />
      ))}
    </ArticleList>
  );
};

const ArticleList = styled.div``;

export default HotArticleList;
