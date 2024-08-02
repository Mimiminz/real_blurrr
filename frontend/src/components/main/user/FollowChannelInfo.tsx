import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Channels } from "@/types/channelType";
import FollowChannelList from "./FollowChannelList";

interface ChannelsProp {
  followChannels: Channels[];
}

const FollowChannelInfo: React.FC<ChannelsProp> = ({ followChannels }) => {
  return (
    <Container>
      <Title>팔로우한 채널</Title>
      {followChannels.length > 0 ? (
        <FollowChannelList followChannels={followChannels} />
      ) : (
        <NoFollow>
          팔로우 한 채널이 없습니다.
          <br />
          채널을 팔로우하고 다양한 정보를 확인하세요!
        </NoFollow>
      )}
    </Container>
  );
};

export default FollowChannelInfo;

const Container = styled.div`
  width: 32%;
  padding: 18px;
  padding-bottom: 8px;
  border-radius: 12px;
  /* border-left: 2px solid ${({ theme }) => theme.colors.articleDivider}; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  /* background: #ffffff; */

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

const NoFollow = styled.h3`
  font-size: 14px;
  padding-left: 6px;
  margin-top: 26px;
`;
