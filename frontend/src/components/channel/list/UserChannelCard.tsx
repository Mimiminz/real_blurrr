import React from 'react';
import styled from 'styled-components';

interface UserChannelCardProps {
  name: string;
  followers: number;
}

const CardContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 200px;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 120px;
  background-color: #e5e7eb;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 12px 0;
`;

const Followers = styled.p`
  color: #6b7280;
`;

const UserChannelCard: React.FC<UserChannelCardProps> = ({ name, followers }) => {
  return (
    <CardContainer>
      <ImagePlaceholder />
      <Title>{name}</Title>
      <Followers>{followers} Followers</Followers>
    </CardContainer>
  );
};

export default UserChannelCard;
