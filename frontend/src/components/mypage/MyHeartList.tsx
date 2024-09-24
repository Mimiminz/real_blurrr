import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { getMyHeartLeagueList, getMyHeartChannelList } from '@/api/mypage';
import ChannelBoardListItem from '../channel/board/ChannelBoardListItem'
import LeagueBoardListItem from '../league/board/LeagueBoardListItem'
import { MyHeartItem } from '@/types/myPageTypes';
import { Mentioned, Posts } from '@/types/channelType';

type Tab = 'league' | 'channel';

const MyHeartList = () => {
  const [heartBoards, setHeartBoards] = useState<MyHeartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<Tab>('league');
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const fetchHeartBoards = async () => {
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        let boards: MyHeartItem[];
        if (selectedTab === 'league') {
          boards = await getMyHeartLeagueList(accessToken, pageNumber);
        } else {
          boards = await getMyHeartChannelList(accessToken, pageNumber);
        }

        setHeartBoards(boards);
      } catch (err) {
        setError('목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeartBoards();
  }, [accessToken, pageNumber, selectedTab]);

  const handlePageChange = (newPageNumber: number) => {
    if (newPageNumber >= 0 && newPageNumber < totalPages) {
      setPageNumber(newPageNumber);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title>내 좋아요 목록 ({heartBoards.length})</Title>
      <TabContainer>
        <Tab active={selectedTab === 'league'} onClick={() => setSelectedTab('league')}>리그</Tab>
        <Tab active={selectedTab === 'channel'} onClick={() => setSelectedTab('channel')}>채널</Tab>
      </TabContainer>
      {heartBoards.length > 0 ? (
        heartBoards.map((item) => {
          if (selectedTab === 'league') {
            return (
              <LeagueBoardListItem
                key={item.id}
                title={item.title}
                writer={item.member.nickname}
                writerCar={item.member.carTitle}
                createdAt={item.createdAt}
                likeCount={item.likeCount}
                commentCount={item.commentCount}
                viewCount={item.viewCount}
              />
            );
          } else {
            const post: Posts = {
              id: item.id,
              title: item.title,
              simpleContent: "", 
              member: item.member,
              createdAt: item.createdAt,
              likeCount: item.likeCount,
              commentCount: item.commentCount,
              viewCount: item.viewCount,
            };
            const mentions: Mentioned[] = item.mentions || []; 
            return (
              <ChannelBoardListItem
                key={item.id}
                post={post}
                mentions={mentions}
                onClick={() => { /* Handle item click */ }}
              />
            );
          }
        })
      ) : (
        <div>좋아요 목록이 없습니다.</div>
      )}
      <Pagination>
        {pageNumber > 0 && (
          <Button onClick={() => handlePageChange(pageNumber - 1)}>이전</Button>
        )}
        {pageNumber < totalPages - 1 && (
          <Button onClick={() => handlePageChange(pageNumber + 1)}>다음</Button>
        )}
      </Pagination>
    </Container>
  );
};

export default MyHeartList;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const Tab = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  padding: 0.5em 1em;
  background-color: ${(props) => (props.active ? '#FFB55E' : 'transparent')};
  border: ${(props) => (props.active ? '1px solid #ffffff' : '1px solid #ddd')};
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
