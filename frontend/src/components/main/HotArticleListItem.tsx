import styled from "styled-components";

const HotArticleListItem = () => {
  return (
    <ArticleDetail>
      <ArticleInfo>
        <Channel>블랙박스 채널</Channel>
        <Title>제목제목제목제목</Title>
      </ArticleInfo>
      <LikeAndComment>
        <Icon>120</Icon>
        <Icon>20</Icon>
      </LikeAndComment>
    </ArticleDetail>
  );
};

const ArticleDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1.6px solid ${({ theme }) => theme.colors.articleDivider};
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Channel = styled.p`
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: 8px;
  margin-top: 10px;
  font-size: 12px;
`;

const Title = styled.p`
  color: black;
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: end;
  margin-top: auto;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.subDiscription};
`;

export default HotArticleListItem;
