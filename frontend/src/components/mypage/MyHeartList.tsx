import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyHeartListItem from './MyHeartListItem';
import { MyHeartItem, MyHeartListResponse } from '@/types/myHeartTypes';
import { useAuthStore } from '@/store/authStore';
import { getMyHeartList } from '@/api/mypage';

interface MyHeartListProps {
}

const MyHeartList = ({}: MyHeartListProps) => {
  const [heartBoards, setHeartBoards] = useState<MyHeartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const fetchHeartBoards = async () => {
      try {
        const response: MyHeartListResponse = await getMyHeartList(accessToken);
        setHeartBoards(response.boards);
      } catch (err: any) {
        setError('데이터를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeartBoards();
  }, [accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Title>내 좋아요 목록 ({heartBoards.length})</Title>
      {heartBoards.map(item => (
        <MyHeartListItem
          key={item.id}
          title={item.title}
          writer={item.member.nickname}
          writerCar={item.member.carTitle}
          createdAt={item.createdAt}
          likeCount={item.likeCount}
          commentCount={item.commentCount}
        />
      ))}
    </Container>
  );
};
export default MyHeartList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;

`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5em;
`;
