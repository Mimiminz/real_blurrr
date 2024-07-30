"use client";

import styled from "styled-components";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import Comment from "@/components/common/UI/comment/Comment";
import Reply from "@/components/common/UI/comment/Reply";
import CreateComment from "@/components/common/UI/comment/CreateComment";
import LeagueDetailTitle from "@/components/league/detail/LeagueDetailTitle";
import { Divider } from "@nextui-org/divider";
import { LiaCommentDots } from "react-icons/lia";
import { useEffect, useState } from "react";

import { BoardDetail } from "@/types/league";
import { fetchLeagueDetail } from "@/api/league";

export default function BoardDetailPage({
  params,
}: {
  params: { leagueId: string; boardId: string };
}) {
  const leagueId = params.leagueId;
  const boardId = params.boardId;

  const [BoardDetail, setBoardDetail] = useState<BoardDetail>(
    {} as BoardDetail
  );

  useEffect(() => {
    const loadBoardDetail = async () => {
      try {
        const details = await fetchLeagueDetail(boardId);
        setBoardDetail(details);
      } catch (error) {
        console.log(error);
      }
    };
    loadBoardDetail();
  }, [boardId]);

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb
          channel="리그"
          subChannel="GV70 리그"
          channelUrl="/league"
        />
      </BreadcrumbContainer>

      <LeagueDetailTitle
        title={BoardDetail.title}
        createdAt={BoardDetail.createdAt}
        viewCount={BoardDetail.viewCount}
        likeCount={BoardDetail.likeCount}
        username={BoardDetail.member.nickname}
        authorprofileUrl={BoardDetail.member.profileUrl}
        authorCarTitle={BoardDetail.member.carTitle}
      />
      <Divider />
      <Content>{BoardDetail.content}</Content>
      <Divider />
      <CommentContainer>
        <CommentNumber>
          <WriterContainer>
            <WriterButton>수정</WriterButton>
            <WriterButton>삭제</WriterButton>
          </WriterContainer>
          <LiaCommentDots />8
        </CommentNumber>
        {/* <CreateComment /> */}
        {/* {BoardDetail.comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              avatarUrl={comment.member.profileUrl}
              userName={comment.member.nickname}
              userDetail={comment.member.carTitle}
              text={comment.content}
              time={comment.createdAt}
            />
            {comment.replies.length > 0 &&
              comment.replies.map((reply) => (
                <Reply
                  key={reply.id}
                  avatarUrl={reply.member.profileUrl}
                  userName={reply.member.nickname}
                  userDetail={reply.member.carTitle}
                  text={reply.content}
                  time={reply.createdAt}
                />
              ))}
          </>
        ))} */}
      </CommentContainer>
    </>
  );
}

const BreadcrumbContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  padding-bottom: 50px;
`;

const CommentNumber = styled.div`
  font-size: 18px;

  svg {
    margin-right: 5px;
    margin-top: 12px;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 20px;
`;

const WriterContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const WriterButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
`;
