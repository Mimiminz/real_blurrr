import React from 'react';
import styled from 'styled-components';

interface CommentProps {
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
`;

const Avatar = styled.img`
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

const Reply = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const Time = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  margin-left: 8px;
`;

const Comment: React.FC<CommentProps> = ({ avatarUrl, userName, userDetail, text, time }) => {
  return (
    <Container>
      <Avatar src={avatarUrl} alt={`${userName}'s avatar`} />
      <Content>
        <UsernameWrapper>
          <Username>{userName}</Username>
          <UserDetail>· {userDetail}</UserDetail>
        </UsernameWrapper>
        <Text>{text}</Text>
        <div>
          <Reply>답글</Reply>
          <Time>{time}</Time>
        </div>
      </Content>
    </Container>
  );
};

export default Comment;
