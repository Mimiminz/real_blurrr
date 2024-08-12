import React from 'react';
import styled from 'styled-components';
import { MdPeopleAlt } from "react-icons/md";

interface UserChannelCardProps {
  name: string;
  followCount: number;
  img: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const UserChannelCard: React.FC<UserChannelCardProps> = ({ name, followCount, img, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <ImageContainer img={img == "" ? 'images/eg_img.png' : img} />
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

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 200px;  
  margin: 0 auto;
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

const Title = styled.h3`
  margin: 20px 0 15px;
  font-size: 17px;
  white-space: nowrap;
`;

const IconContainer = styled.div`
  margin-bottom: 10px;
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

export default UserChannelCard;
