import React from 'react';
import styled from 'styled-components';

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
      <Followers>{followCount} Followers</Followers>
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
  margin: 12px 0;
  font-size: 17px;
`;

const Followers = styled.p`
  color: #6b7280;
`;

export default UserChannelCard;
