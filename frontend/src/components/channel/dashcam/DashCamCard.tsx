import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiEye } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { DashCam } from '@/types/channelType';

interface DashCamCardProps {
  dashCamTitle: DashCam;
}

const DashCamCard: React.FC<DashCamCardProps> = ({ dashCamTitle }) => {
  const { videoUrl, mentionedLeagues, title, viewCount, likeCount, createdAt } = dashCamTitle;

  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return postDate.toISOString().split("T")[0].replace(/-/g, ".");
    }
  };

  return (
    <Card>
      <ThumbnailContainer>
        <Thumbnail src={videoUrl[0]} alt={title} onError={(e) => (e.currentTarget.style.display = 'none')} />
      </ThumbnailContainer>
      <Content>
        <Tags>
          {mentionedLeagues.map((league, index) => (
            <span key={index}>@ {league.name}</span>
          ))}
        </Tags>
        <TitleContainer suppressHydrationWarning={true}>
          <Title>{title}</Title>
        </TitleContainer>
        <Meta>
          <span><FiEye /> {viewCount}</span>
          <span><FiHeart /> {likeCount}</span>
          <span className="created">{formatPostDate(createdAt)}</span>
        </Meta>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(141, 141, 141, 0.1);
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 200px; /* 고정된 높이 설정 */
  background-color: #f1f1f1; /* 이미지가 없을 때 배경색 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Tags = styled.div`
  margin-bottom: 10px;

  span {
    display: inline-block;
    background-color: #f1f1f1;
    border-radius: 10px;
    padding: 4px 8px;
    margin-right: 4px;
    font-size: 12px;
    color: #555;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  display: flex;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;

  &.scroll {
    animation: scroll 10s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const Meta = styled.div`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }

  svg {
    margin-right: 4px;
  }

  .created {
    margin-left: auto;
  }
`;

export default DashCamCard;
