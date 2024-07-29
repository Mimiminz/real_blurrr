import React from "react";
import styled from "styled-components";
import { MdPeople } from "react-icons/md";

interface ChannelCardProps {
  title: string;
  followers: number;
  img: string;
}

const FollowChannelCard: React.FC<ChannelCardProps> = ({
  title,
  followers,
  img,
}) => {
  return (
    <CardContainer>
      <ImageContainer img={img} />
      <Title>{title}</Title>
      <FollowerContainer>
        <Icon>
          <MdPeople />
        </Icon>
        {followers}
      </FollowerContainer>
    </CardContainer>
  );
};

export default FollowChannelCard;

const CardContainer = styled.div`
  border-radius: 8px;
  margin: 10px;
  text-align: center;
  width: 150px;
`;

const ImageContainer = styled.div<{ img: string }>`
  width: 100%;
  height: 100px;
  background-color: #e5e7eb;
  border-radius: 8px;
  background-position: center;
  background-image: url(${(props) => props.img});
`;

const Title = styled.h3`
  margin: 12px 0;
  margin-bottom: 6px;
  font-size: 16px;
`;

const FollowerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.subDiscription};
  padding-bottom: 10px;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 아이콘 크기 조정 */
  vertical-align: middle;
`;
