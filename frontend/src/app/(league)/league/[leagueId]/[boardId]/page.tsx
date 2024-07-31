"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import Comment from "@/components/common/UI/comment/Comment";
import NoComment from "@/components/common/UI/comment/NoComment";
import Reply from "@/components/common/UI/comment/Reply";
import CreateComment from "@/components/common/UI/comment/CreateComment";
import LeagueDetailTitle from "@/components/league/detail/LeagueDetailTitle";
import { Divider } from "@nextui-org/divider";
import { LiaCommentDots } from "react-icons/lia";

import { BoardDetail, Comment as CommentProp } from "@/types/league";
import { fetchLeagueDetail, fetchBoardDelete } from "@/api/league";
import React from "react";
import { useRouter } from "next/navigation";
import { useLeagueStore } from "@/store/leagueStore";

export default function BoardDetailPage({
  params,
}: {
  params: { leagueId: string; boardId: string };
}) {
  const leagueId = params.leagueId;
  const boardId = params.boardId;

  const router = useRouter();
  const { activeTabName, brandLeagueList, userLeagueList, setActiveTabName } =
    useLeagueStore();

  const [boardDetail, setBoardDetail] = useState<BoardDetail | null>(null);

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

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

  const loadBoardDetail = async () => {
    try {
      const details = await fetchLeagueDetail(boardId);
      setBoardDetail(details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBoardDetail();
  });

  useEffect(() => {
    if (!activeTabName || activeTabName === `${undefined} 리그`) {
      const name = `${
        brandLeagueList.find((t) => t.id === leagueId)?.name ||
        userLeagueList.find((t) => t.id === leagueId)?.name
      } 리그`;
      setActiveTabName(name);
    }
  }, [
    activeTabName,
    brandLeagueList,
    userLeagueList,
    leagueId,
    setActiveTabName,
  ]);

  const handleDelete = async () => {
    try {
      await fetchBoardDelete(boardId);
      const isDelete = confirm("정말 삭제하실건가요?");
      if (!isDelete) {
        return;
      }
      router.push(`/league/${leagueId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!boardDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb
          channel="리그"
          subChannel={activeTabName}
          channelUrl={`/league/${leagueId}`}
        />
      </BreadcrumbContainer>
      <LeagueDetailTitle
        title={boardDetail.title}
        createdAt={formatPostDate(boardDetail.createdAt)}
        viewCount={boardDetail.viewCount}
        likeCount={boardDetail.likeCount}
        username={boardDetail.member.nickname}
        authorprofileUrl={boardDetail.member.profileUrl}
        authorCarTitle={boardDetail.member.carTitle}
      />
      <Divider />
      <Content dangerouslySetInnerHTML={{ __html: boardDetail.content }} />
      <Divider />
      <CommentContainer>
        <CommentNumber>
          <WriterContainer>
            <WriterButton onClick={handleDelete}>삭제</WriterButton>
          </WriterContainer>
          <LiaCommentDots />
          {boardDetail.commentCount}
        </CommentNumber>
        <CreateComment
          boardId={boardId}
          isReply={false}
          commentId=""
          onCommentAdded={loadBoardDetail}
        />
        {boardDetail.comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            {comment.status === "ACTIVE" ? (
              <CommentWrapper>
                <Comment
                  id={comment.id}
                  boardId={boardId}
                  avatarUrl={comment.member.profileUrl}
                  userName={comment.member.nickname}
                  userDetail={comment.member.carTitle}
                  text={comment.content}
                  time={comment.createdAt}
                  onCommentAdded={loadBoardDetail}
                />
              </CommentWrapper>
            ) : (
              <NoComment isReply={false} />
            )}
            {comment.replies.length > 0 &&
              comment.replies.map((reply) => (
                <React.Fragment key={reply.id}>
                  {reply.status === "ACTIVE" ? (
                    <Reply
                      id={reply.id}
                      boardId={boardId}
                      avatarUrl={reply.member.profileUrl}
                      userName={reply.member.nickname}
                      userDetail={reply.member.carTitle}
                      text={reply.content}
                      time={reply.createdAt}
                      onCommentAdded={loadBoardDetail}
                    />
                  ) : (
                    <NoComment isReply={true} />
                  )}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
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

const CommentWrapper = styled.div`
  width: 100%;
`;
