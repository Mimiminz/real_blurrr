import styled from "styled-components";
import HotArticleListItem from "@/components/main/HotArticleListItem";

const HotArticleList = () => {
  return (
    <ArticleList>
      <HotArticleListItem />
      <HotArticleListItem />
      <HotArticleListItem />
      <HotArticleListItem />
      <HotArticleListItem />
    </ArticleList>
  );
};

const ArticleList = styled.div``;

export default HotArticleList;
