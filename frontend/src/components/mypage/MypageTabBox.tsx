import { useState } from 'react';
import styled from 'styled-components';
import EnterPassword from '@/components/mypage/EnterPassword';
import Profile from '@/components/mypage/Profile';
import ChangePassword from '@/components/mypage/ChangePassword';
import MyHeartList from '@/components/mypage/MyHeartList';
import MyPostList from '@/components/mypage/MyPostList';
import Withdrawal from '@/components/mypage/Withdrawal';

const tabs = [
  { id: 'enterPassword', label: 'Enter Password' },
  { id: 'profile', label: 'Profile' },
  { id: 'changePassword', label: 'Change Password' },
  { id: 'myHeartList', label: 'My Heart List' },
  { id: 'myPostList', label: 'My Post List' },
  { id: 'withdrawal', label: 'Withdrawal' },
];

type TabId = 'enterPassword' | 'profile' | 'changePassword' | 'myHeartList' | 'myPostList' | 'withdrawal';

const MypageTabBox = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<TabId>('enterPassword');

  const renderContent = (): JSX.Element => {
    console.log('Selected Tab:', selectedTab);
    switch (selectedTab) {
      case 'enterPassword':
        return <EnterPassword onPasswordEntered={() => setSelectedTab('profile')} />;
      case 'profile':
        return <Profile />;
      case 'changePassword':
        return <ChangePassword />;
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
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={selectedTab === tab.id || (selectedTab === 'profile' && tab.id === 'enterPassword')}
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
  width: 200px;
  background-color: #f0f0f0;
  border-right: 2px solid #ccc;
  display: flex;
  flex-direction: column;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) => {
    console.log('Active state:', props.active);
    return props.active ? '#F9803A' : 'transparent';
  }};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-radius: 0 8px 8px 0;
  &:hover {
    background-color: #efefef;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 16px;
`;

const Content = styled.div`

`
