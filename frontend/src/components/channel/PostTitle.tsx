import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import SearchBar from '../common/UI/SearchBar';

interface PostTitleProps {
  channel: string;
  subChannel: string;
  title: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
`;

const TitleSection = styled.div`
  flex: 1 0 auto;

  nav {
    font-size: 14px;
    color: #888;

    span {
      margin-right: 5px;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0;
  }

  button {
    padding: 10px 20px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    margin-top: 10px;
    white-space: nowrap;
  }

  .setPosition{
    display: flex;
    margin-left: auto;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;

  .sort-select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-right: 10px;
  }
`;

const SideSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 10px;

  .setButton{
    height: 100%;
    margin-left: 10px;
    margin-top: 0px;
  }
`;

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;

  a {
    color: inherit;
    text-decoration: none;
    margin-right: 5px;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.main};
    margin-right: 5px;

    &:before {
      content: '>';
      margin-right: 5px;
      color: #888;
    }
  }
`;

const PostTitle: React.FC<PostTitleProps> = ({ channel, subChannel, title }) => {
  return (
    <Container>
      <TitleSection>
        <BreadcrumbContainer>
          <Link href="/channels" legacyBehavior>
            <a>{channel}</a>
          </Link>
          <span>{subChannel}</span>
        </BreadcrumbContainer>
        <h1>{title}</h1>
        <SideSection>
          <button>팔로우 +</button>
          <FilterSection>
            <select className="sort-select">
              <option>게시물 정렬</option>
            </select>
            <SearchBar />
            <button className="setButton">검색</button>
          </FilterSection>
        </SideSection>
        <button className="setPosition">글 작성 +</button>
      </TitleSection>
    </Container>
  );
};

export default PostTitle;
