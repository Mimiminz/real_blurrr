import React from 'react';
import styled from 'styled-components';
import { FiEye } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { DashCams } from '@/types/channelType';

interface DashCamCardProps {
  dashCamTitle: DashCams;
}

const Card = styled.div`
  width: 100%;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(141, 141, 141, 0.1);
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
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

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
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

  .created{
    margin-left: auto;
  }
`;

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
      <Thumbnail src={videoUrl[0]} alt={title} />
      <Content>
        <Tags>
          {mentionedLeagues.map((league, index) => (
            <span key={index}>@ {league.name}</span>
          ))}
        </Tags>
        <Title>{title}</Title>
        <Meta>
          <span><FiEye /> {viewCount}</span>
          <span><FiHeart /> {likeCount}</span>
          <span className="created">{formatPostDate(createdAt)}</span>
        </Meta>
      </Content>
    </Card>
  );
};

export default DashCamCard;
