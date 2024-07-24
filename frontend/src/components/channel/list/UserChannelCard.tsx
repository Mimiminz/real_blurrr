import React from 'react';
import styled from 'styled-components';

interface UserChannelCardProps {
  name: string;
  followers: number;
  img: string; // img prop 추가
}

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 70%;
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
`;

const Followers = styled.p`
  color: #6b7280;
`;

const UserChannelCard: React.FC<UserChannelCardProps> = ({ name, followers, img }) => {
  return (
    <CardContainer>
      <ImageContainer img={img} />
      <Title>{name}</Title>
      <Followers>{followers} Followers</Followers>
    </CardContainer>
  );
};

export default UserChannelCard;
