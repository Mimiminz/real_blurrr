'use client'

import { useState } from 'react';
import styled from 'styled-components';
import EnterPassword from '@/components/mypage/EnterPassword';
import Profile from '@/components/mypage/Profile';
import MyHeartList from '@/components/mypage/MyHeartList';
import MyPostList from '@/components/mypage/MyPostList';
import Withdrawal from '@/components/mypage/Withdrawal';

const tabs = [
  { id: 'enterPassword', label: '내 정보' },
  { id: 'myHeartList', label: '내 좋아요 목록' },
  { id: 'myPostList', label: '내 게시글 목록' },
  { id: 'withdrawal', label: '회원 탈퇴' },
];

type TabId = 'enterPassword' | 'profile' | 'myHeartList' | 'myPostList' | 'withdrawal';

const MypageTabBox = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<TabId>('enterPassword');

  const renderContent = (): JSX.Element => {
    switch (selectedTab) {
      case 'enterPassword':
        return <EnterPassword onPasswordEntered={() => setSelectedTab('profile')} />;
      case 'profile':
        return <Profile />;
      case 'myHeartList':
        return <MyHeartList />;
      case 'myPostList':
        return <MyPostList />;
      case 'withdrawal':
        return <Withdrawal />;
      default:
        return <div>탭 선택</div>;
    }
  };

  return (
    <Container>
      <Tabs>
        <UserContainer>
          <UserImage src = 'images/profile.jpg'></UserImage>
          <UserCarName>테슬라 오너</UserCarName>
          <UserName>상현전 님</UserName>
        </UserContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={selectedTab === tab.id}
            onClick={() => setSelectedTab(tab.id as TabId)}
          >
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </Container>
  );
};

export default MypageTabBox;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Tabs = styled.div`
  width: 300px;
  background-color: #ffffff;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border-radius: 15px;
`

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding:5px;
`

const UserCarName = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding:5px;
`

const UserName = styled.div`
  font-size: 15px;
  font-weight: bold;
`

const Tab = styled.div<{ active: boolean }>`
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#FFB55E' : 'transparent')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-left: ${(props) => (props.active ? '4px solid #000000' : 'none')};
  border-radius: 0 8px 8px 0;
  &:hover {
    background-color: #efefef;
  }
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 16px;
`;

const Content = styled.div`

`;
