'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EnterPassword from '@/components/mypage/EnterPassword';
import Profile from '@/components/mypage/Profile';
import ChangePassword from '@/components/mypage/ChangePassword';
import MyHeartList from '@/components/mypage/MyHeartList';
import MyPostList from '@/components/mypage/MyPostList';
import Withdrawal from '@/components/mypage/Withdrawal';
import { useAuthStore } from '@/store/authStore';

const tabs = [
  { id: 'enterPassword', label: '내 정보' },
  { id: 'changePassword', label: '비밀번호 변경'},
  // { id: 'myHeartList', label: '내 좋아요 목록' },
  // { id: 'myPostList', label: '내 게시글 목록' },
  { id: 'withdrawal', label: '회원 탈퇴' },
];

type TabId = 'enterPassword' | 'profile' | 'changePassword' |'myHeartList' | 'myPostList' | 'withdrawal';

const MypageTabBox = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<TabId>('enterPassword');
  const [profileImage, setProfileImage] = useState<string>('');
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileUrl || '');
    }
  }, [user]);

  const renderContent = (): JSX.Element => {
    switch (selectedTab) {
      case 'enterPassword':
        return <EnterPassword onPasswordEntered={() => setSelectedTab('profile')} />;
      case 'changePassword':
        return <ChangePassword />;
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
          <UserImage src = {user ? user.profileUrl : "" }/>
          <UserName>{user ? user.nickname: ""}</UserName>
          <UserCarName>{user?.carTitle || "뚜벅이"}</UserCarName>
        </UserContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={selectedTab === tab.id}
            isProfileTab={tab.id === 'profile'}
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
  width:100%;
  height:500px;
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
  object-fit: cover;
`

const UserCarName = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #969696;
`

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Tab = styled.div<{ active: boolean; isProfileTab: boolean }>`
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isProfileTab || props.active ? '#F9803A' : 'transparent'};
  color: ${(props) =>
    props.isProfileTab || props.active ? '#ffffff' : '#000000'};
  font-weight: ${(props) => (props.isProfileTab || props.active ? 'normal' : 'normal')};
  border-radius: 0 8px 8px 0;
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
