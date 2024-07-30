import React from 'react';
import styled from 'styled-components';
import { Mentioned } from '@/types/channelType';

interface ChannelCardProps {
  name: string;
  followCount: number;
  tags: Mentioned[];
  imgUrl: string;
}

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #fff;
  margin: 0 auto; /* 카드가 중앙에 위치하도록 설정 */
  max-width: 200px; 
  
`;

const ImageContainer = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 120px;
  background-color: #e5e7eb;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.imgUrl});
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

const Tag = styled.span`
  background-color: #374151;
  color: #fff;
  border-radius: 12px;
  padding: 4px 8px;
  margin: 0 4px;
`;

const Title = styled.h3`
  margin: 12px 0;
  font-size: 16px;
`;

const LikesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b7280;
`;

const LikeIcon = styled.span`
  margin-right: 8px;
  color: #f59e0b;
`;

const ChannelCard: React.FC<ChannelCardProps> = ({ name, followCount, tags, imgUrl }) => {
  return (
    <CardContainer>
      <ImageContainer imgUrl={imgUrl == "" ? 'images/eg_img.png' : imgUrl} />
      <TagsContainer>
        {tags.map((tag) => (
          <Tag key={tag.id}>@ {tag.name}</Tag>
        ))}
      </TagsContainer>
      <Title>{name}</Title>
      <LikesContainer>
        <LikeIcon>👍</LikeIcon>
        <span>{followCount}</span>
      </LikesContainer>
    </CardContainer>
  );
};

export default ChannelCard;
