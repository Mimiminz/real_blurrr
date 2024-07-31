import React from 'react';
import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa6';
import { LiaCommentDots } from 'react-icons/lia';
import { MdAccessTime } from 'react-icons/md';
import { Mentioned, Posts } from '@/types/channelType';

interface ChannelBoardListItemProps {
  post: Posts;
  mentions: Mentioned[];
  onClick: () => void;
}

function ChannelBoardListItem({ post, mentions, onClick }: ChannelBoardListItemProps) { // post를 props로 사용

  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      // 만약 작성 시간이 당일이면 시간으로 표시
      return postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // 당일이 아니면 날짜만 표시
      return postDate.toISOString().split('T')[0].replace(/-/g, '.');
    }
  };

  const mentionArray = mentions.map((mention, index) => (
    <Channel key={index}>{mention.name}</Channel>
  ));

  return (
    <ArticleDetail onClick={onClick}>
      <ArticleInfo>
        <ChannelContainer>
          {mentionArray}
        </ChannelContainer>
        <Title>{post.title}</Title>
        <UserContainer>
          <UserName>{post.member.nickname}</UserName>
          <UserTags>{post.member.carTitle}</UserTags>
        </UserContainer>
        <Text>{post.content}</Text>
      </ArticleInfo>
      <LikeAndComment>
        <LikeSection>
          <Icon>
            <MdAccessTime />
          </Icon>
          {formatPostDate(post.createdAt)}
        </LikeSection>
        <LikeSection>
          <Icon>
            <FaRegHeart />
          </Icon>
          {post.likeCount}
        </LikeSection>
        <LikeSection>
          <Icon>
            <LiaCommentDots />
          </Icon>
          {post.commentCount}
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
  margin-bottom:5px;
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

export default ChannelBoardListItem;
