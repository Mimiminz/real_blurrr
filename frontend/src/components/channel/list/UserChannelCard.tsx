import React from 'react';
import styled from 'styled-components';

interface UserChannelCardProps {
  name: string;
  followCount: number;
  imgUrl: string; // img prop 추가
}

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 200px;  
  margin: 0 auto;
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

const Title = styled.h3`
  margin: 12px 0;
`;

const Followers = styled.p`
  color: #6b7280;
`;

const UserChannelCard: React.FC<UserChannelCardProps> = ({ name, followCount, imgUrl }) => {
  return (
    <CardContainer>
      <ImageContainer imgUrl={imgUrl == "" ? 'images/eg_img.png' : imgUrl} />
      <Title>{name}</Title>
      <Followers>{followCount} Followers</Followers>
    </CardContainer>
  );
};

export default UserChannelCard;
