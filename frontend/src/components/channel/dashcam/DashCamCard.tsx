import React from 'react';
import styled from 'styled-components';
import { FiEye } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";

interface DashCamCardProps {
  thumbnail: string;
  tags: string[];
  title: string;
  viewer: number;
  likes: number;
  createdDate: string;
}

const Card = styled.div`
  width: 300px;
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

const DashCamCard: React.FC<DashCamCardProps> = ({ thumbnail, tags, title, viewer, likes, createdDate }) => {

  return (
    <Card>
      <Thumbnail src={thumbnail} alt={title} />
      <Content>
        <Tags>
          {tags.map((tag, index) => (
            <span key={index}>@ {tag}</span>
          ))}
        </Tags>
        <Title>{title}</Title>
        <Meta>
          <span><FiEye /> {viewer}</span>
          <span><FiHeart /> {likes}</span>
          <span className="created">{createdDate}</span>
        </Meta>
      </Content>
    </Card>
  );
};

export default DashCamCard;
