import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { Mentioned, Posts } from "@/types/channelType";
import { formatPostDate } from "@/utils/formatPostDate";

interface ChannelBoardListItemProps {
  post: Posts;
  mentions: Mentioned[];
  onClick: () => void;
}

function ChannelBoardListItem({
  post,
  mentions,
  onClick,
}: ChannelBoardListItemProps) {
  // post를 props로 사용

  const mentionArray = mentions.map((mention, index) => (
    <Channel key={index}>{mention.name}</Channel>
  ));

  return (
    <ArticleDetail onClick={onClick}>
      <ArticleInfo>
        <ChannelContainer>{mentionArray}</ChannelContainer>
        <Title>{post.title}</Title>
        <UserContainer>
          <UserName>{post.member.nickname}</UserName>
          <UserTags>{post.member.carTitle}</UserTags>
        </UserContainer>
      </ArticleInfo>
      <LikeAndComment>
        <LikeSection>
          <BiTimeFive />
          {formatPostDate(post.createdAt)}
        </LikeSection>
        <LikeSection>
          <FaRegHeart />
          {post.likeCount}
        </LikeSection>
        <LikeSection>
          <FaRegComment />
          {post.commentCount}
        </LikeSection>
        <LikeSection>
          <FaRegEye />
          {post.viewCount}
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
  gap: 10px;
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

const ChannelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 5px;
`;

const Channel = styled.p`
  background-color: #f9f9f9;
  color: #000000;
  padding: 5px 10px;
  border-radius: 8px;
  border: 0.3px solid #929292;
  font-weight: bold;
  margin: 0;
  font-size: 9px;
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
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
`;

const LikeSection = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 13px;

  svg {
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }
`;

export default ChannelBoardListItem;
