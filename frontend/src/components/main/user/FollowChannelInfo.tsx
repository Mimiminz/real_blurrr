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
  width: 32%;
  padding: 18px;
  padding-bottom: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  background: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 768px) {
    width: 32%;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }

  @media (min-width: 1440px) {
    width: 45%;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 0;
  padding-left: 6px;
`;
