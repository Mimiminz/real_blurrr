import React from "react";
import styled from "styled-components";
import FollowChannelList from "./FollowChannelList";

const FollowChannelInfo: React.FC = () => {
  return (
    <Container>
      <Title>팔로우한 채널</Title>
      <FollowChannelList />
    </Container>
  );
};

export default FollowChannelInfo;

const Container = styled.div`
  width: 50%;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;
