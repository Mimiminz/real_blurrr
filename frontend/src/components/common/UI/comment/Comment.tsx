import React, { useState } from "react";
import styled from "styled-components";
import { fetchCommentDelete } from "@/api/comment";
import { WiTime4 } from "react-icons/wi";
import CreateComment from "@/components/common/UI/comment/CreateComment";

interface CommentProps {
  id: string;
  boardId: string;
  avatarUrl: string;
  userName: string;
  userDetail: string | null;
  text: string;
  time: string;
  onCommentAdded: () => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  boardId,
  avatarUrl,
  userName,
  userDetail,
  text,
  time,
  onCommentAdded,
}) => {
  const [showReply, setShowReply] = useState(false);

  const handleDelete = async () => {
    try {
      await fetchCommentDelete(boardId, id);
      console.error("Delete Complete");
      onCommentAdded();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplyToggle = () => {
    setShowReply(!showReply);
  };

  return (
    <Container>
      <Avatar src={avatarUrl} alt={`${userName}'s avatar`} />
      <Content>
        <UsernameWrapper>
          <Username>{userName}</Username>
          <UserDetail>· {userDetail || "뚜벅이"}</UserDetail>
        </UsernameWrapper>
        <Text>{text}</Text>
        <ActionRow>
          <Reply onClick={handleReplyToggle}>답글</Reply>
          <Delete onClick={handleDelete}>삭제</Delete>
          <Time>
            <WiTime4 style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {time.slice(0, 10)}
          </Time>
        </ActionRow>
        {showReply && (
          <ReplyCreate>
            <CreateComment boardId={boardId} isReply={true} commentId={id} onCommentAdded={onCommentAdded} />
          </ReplyCreate>
        )}
      </Content>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-top: 3px;
  margin-right: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UsernameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #f57c00;
`;

const UserDetail = styled.span`
  font-size: 13px;
  color: #888;
  margin-left: 8px;
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Reply = styled.span`
  font-size: 12px;
  color: #999;
  cursor: pointer;
`;

const Delete = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 6px;
  cursor: pointer;
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
