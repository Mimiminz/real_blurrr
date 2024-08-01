import React from "react";
import styled from "styled-components";
import { fetchCommentDelete } from "@/api/comment";
import { WiTime4 } from "react-icons/wi";
import { CommentListItemProps } from "@/types/commentTypes";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  margin-left: 30px;
  position: relative;
  padding-left: 20px;
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
const Delete = styled.span`
  font-size: 12px;
  color: #999;
  cursor: pointer;
`;

const Time = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-left: 8px;
`;

const DotLine = styled.div`
  position: absolute;
  left: 12px; /* Adjust to position the dot line */
  top: 0;
  bottom: 0;
  border-left: 2px dotted #ccc;
`;

const Reply: React.FC<CommentListItemProps> = ({
  id,
  boardId,
  avatarUrl,
  userName,
  userDetail,
  text,
  time,
  onCommentAdded,
}) => {
  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return postDate.toISOString().split("T")[0].replace(/-/g, ".");
    }
  };

  const handleDelete = async () => {
    try {
      await fetchCommentDelete(boardId, id);
      console.error("Delete Complete");
      onCommentAdded();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <Container>
      <DotLine />
      <Avatar src={avatarUrl} alt={`${userName}'s avatar`} />
      <Content>
        <UsernameWrapper>
          <Username>{userName}</Username>
          <UserDetail>· {userDetail || "뚜벅이"}</UserDetail>
        </UsernameWrapper>
        <Text>{text}</Text>
        <ActionRow>
          <Delete onClick={handleDelete}>삭제</Delete>
          <Time>
            <WiTime4 style={{ marginRight: "4px", verticalAlign: "middle" }} />
            {formatPostDate(time)}
          </Time>
        </ActionRow>
      </Content>
    </Container>
  );
};

export default Reply;
