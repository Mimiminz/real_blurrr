import React from 'react';
import styled from 'styled-components';
import { Mentioned } from '@/types/channelType';
import { MdPeopleAlt } from "react-icons/md";

interface ChannelCardProps {
  name: string;
  followCount: number;
  tags: Mentioned[];
  img: string;
}

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #fff;
  margin: 0 auto; 
  max-width: 200px; 
  cursor: pointer;
`;

const ImageContainer = styled.div<{ img: string }>`
  width: 100%;
  height: 120px;
  background-color: #e5e7eb;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.img});
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

const Tag = styled.span`
  background-color: #374151;
  color: #fff;
  font-size: 13px;
  border-radius: 12px;
  padding: 4px 8px;
  margin: 0 4px;
`;

const Title = styled.h3`
  margin: 12px 0;
  font-size: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b7280;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  vertical-align: middle;
`;

const Count = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subDiscription};
`;

const ChannelCard: React.FC<ChannelCardProps> = ({ name, followCount, tags, img }) => {
  return (
    <CardContainer>
      <ImageContainer img={img == "" ? 'images/eg_img.png' : img} />
      <TagsContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>@ {tag.name}</Tag>
        ))}
      </TagsContainer>
      <Title>{name}</Title>
      <IconContainer>
        <Icon>
          <MdPeopleAlt />
        </Icon>
        <Count>{followCount}</Count>
      </IconContainer>
    </CardContainer>
  );
};

export default ChannelCard;
