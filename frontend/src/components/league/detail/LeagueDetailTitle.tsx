import React from "react";
import styled from "styled-components";
import { FaHeart, FaEye } from "react-icons/fa";
import { BoardDetailProps } from "@/types/leagueTypes";
import { formatPostDate } from "@/utils/formatPostDate";

const LeagueDetailTitle: React.FC<BoardDetailProps> = ({
  title,
  createdAt,
  viewCount,
  likeCount,
  username,
  authorprofileUrl,
  authorCarTitle,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <InfoRow>
        <Infoleft>
          <Date>{formatPostDate(createdAt)}</Date>
          <Icons>
            <FaEye />
            <Views>{viewCount}</Views>
            <FaHeart />
            <Likes>{likeCount}</Likes>
          </Icons>
        </Infoleft>
        <AuthorInfo>
          <Author>
            <Avatar src={authorprofileUrl} alt={`${username}'s avatar`} />
            <Username>{username}</Username>
          </Author>
          <CarInfo>{authorCarTitle}</CarInfo>
        </AuthorInfo>
      </InfoRow>
    </Container>
  );
};

export default LeagueDetailTitle;

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  font-size: 14px;
`;

const Date = styled.span`
  margin-right: 15px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const Views = styled.span`
  margin-right: 15px;
`;

const Likes = styled.span`
  margin-right: 15px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  color: #888;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const CarInfo = styled.span`
  color: #888;
`;

const Infoleft = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const Username = styled.span`
  font-weight: bold;
`;
