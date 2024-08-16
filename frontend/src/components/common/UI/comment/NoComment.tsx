import React from "react";
import styled from "styled-components";
import { NoCommentProps } from "@/types/commentTypes";

const NoComment: React.FC<NoCommentProps> = ({ isReply }) => {
  return (
    <>
      {isReply ? (
        <ReplyContainer>
          <DotLine />
          <Avatar />
          <Content>
            <Text>삭제된 댓글입니다.</Text>
          </Content>
        </ReplyContainer>
      ) : (
        <Container>
          <Avatar />
          <Content>
            <Text>삭제된 댓글입니다.</Text>
          </Content>
        </Container>
      )}
    </>
  );
};

export default NoComment;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;
const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 30px;
  position: relative;
  padding-left: 20px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-top: 3px;
  margin-right: 8px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DotLine = styled.div`
  position: absolute;
  left: 12px; 
  top: 0;
  bottom: 0;
  border-left: 2px dotted #ccc;
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
`;
