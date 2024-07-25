import React from 'react';
import styled from 'styled-components';

interface ReplyProps {
  avatarUrl: string;
  userName: string;
  userDetail: string;  // 새로운 속성 추가
  text: string;
  time: string;
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  margin-left: 20px; /* Adjust the indentation for replies */
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsernameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px; // UserDetail과의 간격 조정
`;

const Username = styled.span`
  font-weight: bold;
  color: #f57c00;
`;

const UserDetail = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 8px;
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
`;

const Time = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const Reply: React.FC<ReplyProps> = ({ avatarUrl, userName, userDetail, text, time }) => {
  return (
    <Container>
      <Avatar />
      <Content>
        <UsernameWrapper>
          <Username>{userName}</Username>
          <UserDetail>· {userDetail}</UserDetail>
        </UsernameWrapper>
        <Text>픽시자전거이며 브레이크를 밟았는데도 멈추질 못했다고 하네요</Text>
        <Time>6h</Time>
      </Content>
    </Container>
  );
};

export default Reply;
