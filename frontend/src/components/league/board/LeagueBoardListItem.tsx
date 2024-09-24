import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { LeagueBoardListItemProps } from "@/types/leagueTypes";
import { formatPostDate } from "@/utils/formatPostDate";

function LeagueBoardListItem({
  title,
  writer,
  writerCar,
  createdAt,
  likeCount,
  commentCount,
  viewCount,
}: LeagueBoardListItemProps) {
  return (
    <ArticleDetail>
      <ArticleInfo>
        <Title>{title}</Title>
        <UserContainer>
          <UserName>{writer}</UserName>
          <UserTags>ㆍ{writerCar}</UserTags>
        </UserContainer>
      </ArticleInfo>
      <LikeAndComment>
        <LikeSection>
          <BiTimeFive />
          {formatPostDate(createdAt)}
        </LikeSection>
        <LikeSection>
          <FaRegHeart />
          {likeCount}
        </LikeSection>
        <LikeSection>
          <FaRegEye />
          {viewCount}
        </LikeSection>
        <LikeSection>
          <FaRegComment />
          {commentCount}
        </LikeSection>
      </LikeAndComment>
    </ArticleDetail>
  );
}

const ArticleDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1.6px solid ${({ theme }) => theme.colors.articleDivider};
  cursor: pointer;

  &:hover {
    background-color: #ebebeb3d;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const UserTags = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #787878;
`;

const Title = styled.p`
  color: black;
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
  font-weight: bold;
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
`;

const LikeSection = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  /* width: 100%; */
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 13.5px;

  svg {
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }
`;

export default LeagueBoardListItem;
