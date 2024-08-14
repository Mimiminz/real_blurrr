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
  display: flex;
  flex-direction: column;
  /* justify-content: ; */
  /* align-items: center; */
  flex: 1;
  width: 100%;
  height: 240px;
  margin-left: 20px; /* UserCarInfo와 간격 추가 */
  /* padding-top: 18px; */
  border-radius: 12px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 40px;
  margin-top: 0;
  padding-left: 6px;
  font-weight: bold;
`;

const NoFollow = styled.h3`
  font-size: 14px;
  padding-left: 6px;
  margin-top: 26px;
`;
