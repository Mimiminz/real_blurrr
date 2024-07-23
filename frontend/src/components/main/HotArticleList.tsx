import styled from "styled-components";
import HotArticleListItem from "@/components/main/HotArticleListItem";
import dummy from "@/db/mainPageData.json";

const HotArticleList = () => {
  return (
    <ArticleList>
      {dummy.HotArticles.map((article, index) => (
        <HotArticleListItem
          key={index}
          channel={article.channel}
          title={article.title}
          likes={article.likes}
          comments={article.comments}
        />
      ))}
    </ArticleList>
  );
};
const ArticleList = styled.div``;

export default HotArticleList;
