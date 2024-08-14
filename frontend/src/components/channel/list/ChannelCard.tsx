import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Mentioned } from '@/types/channelType';
import { MdPeopleAlt } from "react-icons/md";

interface ChannelCardProps {
  name: string;
  followCount: number;
  tags: Mentioned[];
  img: string;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ name, followCount, tags, img }) => {
  return (
    <CardContainer>
      <ImageContainer img={img == "" ? 'images/eg_img.png' : img}>
      </ImageContainer>
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
        <Count>{followCount} 팔로워</Count>
      </IconContainer>
    </CardContainer>
  );
};

const bounceIn = keyframes`
  0% {
    transform: scale(0.97);
    opacity: 0.9;
  }
  60% {
    transform: scale(1.04);
    opacity: 0.95;
  }
  100% {
    transform: scale(1.03);
    opacity: 1;
  }
`;

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #fff;
  margin: 0 auto; 
  max-width: 200px;
  cursor: pointer;

  &:hover {
    animation: ${bounceIn} 0.5s forwards;
  }
`;

const ImageContainer = styled.div<{ img: string }>`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background-color: #f3f3f3;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.img});
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 1px 3px 3px rgba(141, 141, 141, 0.1);
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 7px;
  min-height: 25px;
  animation: aniScroll 15s linear infinite;
`;

const Tag = styled.span`
  background-color: #374151;
  color: #fff;
  font-size: 13px;
  border-radius: 12px;
  padding: 4px 8px;
  margin: 0 4px;
  white-space: nowrap; /* 텍스트가 한 줄에 나타나도록 설정 */
  overflow: hidden; /* 범위를 벗어난 텍스트를 숨김 */
  text-overflow: ellipsis; /* 텍스트가 넘치면 "..." 처리 */
  display: block; /* 애니메이션을 위해 블록 요소로 설정 */
  position: relative;
  /* animation: scroll 10s linear infinite;  */
  
  @keyframes scroll {
    from {
      transform: translateX(100%); /* 오른쪽에서 시작 */
    }
    to {
      transform: translateX(-100%); /* 왼쪽으로 이동 */
    }
  }
`;

const Title = styled.h3`
  margin: 0px 0px 5px;
  font-size: 17px;
  white-space: nowrap;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b7280;
  margin-bottom: 10px;
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

export default ChannelCard;
