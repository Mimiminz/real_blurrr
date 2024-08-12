import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { LiaCommentDots } from "react-icons/lia";
import { MdAccessTime } from "react-icons/md";
import { LeagueMentionListItemProps } from "@/types/leagueTypes";
import { formatPostDate } from "@/utils/formatPostDate";

function LeagueMentionListItem({
  title,
  writer,
  writerCar,
  createdAt,
  likeCount,
  commentCount,
  channelName,
}: LeagueMentionListItemProps) {
  return (
    <ArticleDetail>
      <ArticleInfo>
        <Channel>{channelName}</Channel>
        <Title>{title}</Title>
        <UserContainer>
          <UserName>{writer}</UserName>
          <UserTags>ㆍ{writerCar}</UserTags>
        </UserContainer>
      </ArticleInfo>
      <LikeAndComment>
        <LikeSection>
          <Icon>
            <MdAccessTime />
          </Icon>
          {formatPostDate(createdAt)}
        </LikeSection>
        <LikeSection>
          <Icon>
            <FaRegHeart />
          </Icon>
          {likeCount}
        </LikeSection>
        <LikeSection>
          <Icon>
            <LiaCommentDots />
          </Icon>
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

const Channel = styled.p`
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: 6px;
  margin-top: 10px;
  font-size: 12px;
`;

const UserContainer = styled.div`
  display: flex;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 12px;
`;

const UserTags = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
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

const Text = styled.p`
  color: black;
  font-size: 13px;
  margin: 10;
  margin-bottom: 8px;
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const LikeSection = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 14px;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  vertical-align: middle;
`;

export default LeagueMentionListItem;
