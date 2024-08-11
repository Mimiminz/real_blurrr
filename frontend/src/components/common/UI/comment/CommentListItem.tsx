import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { fetchCommentDelete, fetchLeagueCommentDelete } from "@/api/comment";
import { WiTime4 } from "react-icons/wi";
import CreateComment from "@/components/common/UI/comment/CreateComment";

import { CommentListItemProps } from "@/types/commentTypes";
import { useAuthStore } from "@/store/authStore";
import { formatPostDate } from "@/utils/formatPostDate";

const CommentListItem: React.FC<CommentListItemProps> = ({
  id,
  boardId,
  avatarUrl,
  userName,
  userDetail,
  text,
  time,
  onCommentAdded,
  isLeague,
  leagueId,
  boardAuthor,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const { isLoggedIn, user } = useAuthStore();
  const replyInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async () => {
    try {
      if (isLeague) {
        await fetchLeagueCommentDelete(boardId, id, leagueId);
      } else {
        await fetchCommentDelete(boardId, id);
      }
      console.error("Delete Complete");
      onCommentAdded();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplyToggle = () => {
    setShowReply(!showReply);
  };

  useEffect(() => {
    if (showReply && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [showReply]);

  useEffect(() => {
    if (userDetail && userDetail.length > 10) {
      setIsLong(true);
    }
  }, [userDetail]);

  return (
    <Container>
      <Avatar src={avatarUrl} alt={`${userName}'s avatar`} />
      <Content>
        <UsernameWrapper>
          <Username className={boardAuthor === userName ? "author" : ""}>
            {userName}
          </Username>
          <UserDetail className={isLong ? "long" : ""}>
            {userDetail || "뚜벅이"}
          </UserDetail>
          {/* <UserDetail className="long">
            벤츠 GLS 600 4MATIC MANUFAKTUR 2024
          </UserDetail> */}
        </UsernameWrapper>
        <Text>{text}</Text>
        <ActionRow>
          {isLoggedIn && (
            <Reply onClick={handleReplyToggle}>
              {showReply ? "닫기" : "답글"}
            </Reply>
          )}
          {userName === user?.nickname && (
            <Delete onClick={handleDelete}>삭제</Delete>
          )}
          <Time>
            <WiTime4 style={{ marginRight: "4px", verticalAlign: "middle" }} />
            {formatPostDate(time)}
          </Time>
        </ActionRow>
        {showReply && (
          <ReplyCreate>
            <CreateComment
              boardId={boardId}
              leagueId={leagueId}
              isLeague={isLeague}
              isReply={true}
              commentId={id}
              onCommentAdded={onCommentAdded}
              inputRef={replyInputRef}
            />
          </ReplyCreate>
        )}
      </Content>
    </Container>
  );
};

export default CommentListItem;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 8px;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UsernameWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 6px;
  justify-content: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #333;

  &.author {
    color: #f57c00;
  }

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const UserDetail = styled.span`
  font-size: 12px;
  color: #888;

  &.long {
    font-size: 11px;
  }

  @media (min-width: 768px) {
    font-size: 13px;

    &.long {
      font-size: 12px;
    }

    &::before {
      content: "ㆍ";
      display: inline;
    }
  }
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Reply = styled.span`
  font-size: 11px;
  color: #999;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const Delete = styled.span`
  font-size: 11px;
  color: #999;
  margin-left: 6px;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const Time = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-left: 8px;
`;

const ReplyCreate = styled.div`
  margin-top: 10px;
`;
