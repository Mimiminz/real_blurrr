import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyHeartListItem from './MyHeartListItem';
import { MyHeartItem } from '@/types/myHeartTypes';
import { useAuthStore } from '@/store/authStore';
import { getMyHeartList } from '@/api/mypage';

const MyHeartList = () => {
  const [heartBoards, setHeartBoards] = useState<MyHeartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const fetchHeartBoards = async () => {
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }
      
      try {
        const data = await getMyHeartList(accessToken);
        setHeartBoards(data);
      } catch (err) {
        setError('좋아요 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeartBoards();
  }, [accessToken]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title>내 좋아요 목록 ({heartBoards.length})</Title>
      {heartBoards.length > 0 ? (
        heartBoards.map((item) => (
          <MyHeartListItem
            key={item.id}
            title={item.title}
            writer={item.member.nickname}
            writerCar={item.member.carTitle}
            createdAt={item.createdAt}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
          />
        ))
      ) : (
        <div>좋아요 목록이 없습니다.</div>
      )}
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
