import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyHeartListItem from './MyHeartListItem';
import { MyPostItem } from '@/types/myPageTypes';
import { useAuthStore } from '@/store/authStore';
import { getMyPostChannelList, getMyPostLeagueList } from '@/api/mypage';

type Tab = 'league' | 'channel';

const MyPostList = () => {
  const [postBoards, setPostBoards] = useState<MyPostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>('league');
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const fetchHeartBoards = async () => {
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        let data: MyPostItem[] = [];
        if (selectedTab === 'league') {
          data = await getMyPostLeagueList(accessToken, pageNumber);
        } else if (selectedTab === 'channel') {
          data = await getMyPostChannelList(accessToken, pageNumber);
        }
        setPostBoards(data || []);
      } catch (err) {
        setError('목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeartBoards();
  }, [accessToken, pageNumber]);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title>내 게시글 목록 ({postBoards.length})</Title>
      <TabContainer>
        <Tab active={selectedTab === 'leagues'} onClick={() => setSelectedTab('leagues')}>리그</Tab>
        <Tab active={selectedTab === 'channels'} onClick={() => setSelectedTab('channels')}>채널</Tab>
      </TabContainer>
      {postBoards.length > 0 ? (
        postBoards.map((item) => (
          <MyHeartListItem
            key={item.id}
            title={item.title}
            writer={item.member.nickname}
            writerCar={item.member.carTitle}
            createdAt={item.createdAt}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            viewCount={item.viewCount}           />
        ))
        
      ) : (
        <div>좋아요 목록이 없습니다.</div>
      )}
      <Pagination>
        {pageNumber > 0 && (
          <Button onClick={() => handlePageChange(pageNumber - 1)}>이전</Button>
        )}
        <Button onClick={() => handlePageChange(pageNumber + 1)}>다음</Button>
      </Pagination>
    </Container>
  );
};

export default MyPostList;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const Tab = styled.button<{ active: boolean }>`
  margin-right: 1em;
  padding: 0.5em 1em;
  background-color: ${(props) => (props.active ? '#FFB55E' : 'transparent')};
  border: ${(props) => (props.active ? '1px solid #000000' : '1px solid #ddd')};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

const Button = styled.button`
  margin: 0 0.5em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 50px;
  color: #000000;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
