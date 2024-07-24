import React from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/common/UI/SearchBar';
import Breadcrumb from '@/components/common/UI/BreadCrumb';
import { useRouter } from "next/navigation";

interface PostTitleProps {
  channel: string;
  subChannel: string;
  channelUrl: string;
  title: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
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

  .setButton {
    padding: 10px 20px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
  }

  .setPosition {
    display: flex;
    margin-left: auto;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

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
  margin-top: 10px;
`;

const PostTitle: React.FC<PostTitleProps> = ({ channel, subChannel, title, channelUrl }) => {
  const router = useRouter();

  const handleCreatePost = () => {
    if (channel === "채널") {
      if (subChannel === "블랙 박스") {
        router.push("/channels/1/boards/write");
      } else {
        router.push("/channels/1/boards/write");
      }
    } else if (channel === "리그") {
      router.push("/channels/1/boards/write");
    }
  };

  return (
    <Container>
      <TitleSection>
        <Breadcrumb channel={channel} subChannel={subChannel} channelUrl={channelUrl} />
        <h1>{title}</h1>
        <SideSection>
          <button className="setButton">팔로우 +</button>
          <SearchBar />
        </SideSection>
        <FilterSection>
          <select className="sort-select">
            <option>게시물 정렬</option>
          </select>
          <button className="setPosition setButton" onClick={handleCreatePost}>글 작성 +</button>
        </FilterSection>
      </TitleSection>
    </Container >
  );
};

export default PostTitle;
