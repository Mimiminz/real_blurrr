import styled from "styled-components";
import BlackboxListItem from "./BlackboxListItem";

const HotArticleList = () => {
  return (
    <ArticleList>
      <BlackboxListItem />
      <BlackboxListItem />
      <BlackboxListItem />
      <BlackboxListItem />
      <BlackboxListItem />
    </ArticleList>
  );
};

const ArticleList = styled.div``;

export default HotArticleList;
