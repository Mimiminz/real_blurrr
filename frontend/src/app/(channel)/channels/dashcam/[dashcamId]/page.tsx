"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import DashCamContent from '@/components/channel/dashcam/detail/DashCamContent';
import CreateComment from '@/components/common/UI/comment/CreateComment';
import Comment from '@/components/common/UI/comment/Comment';
import Reply from '@/components/common/UI/comment/Reply';
import Vote from '@/components/channel/dashcam/detail/Vote';
import { LiaCommentDots } from "react-icons/lia";
import { FaRegHeart, FaRegEye } from "react-icons/fa";
import { fetchDashCamDetail } from '@/api/channel';
import { DashCamDetail, CommentStatus } from '@/types/channelType';

const Container = styled.div`
  padding-top: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const InnerContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const LeftColumn = styled.div`
  flex: 1.5;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Section = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommentsSection = styled(Section)`
  flex-grow: 1;
  height: 100%;
  margin-bottom: 16px;
  overflow-y: auto; /* 내용이 많을 때 스크롤 가능 */
`;
const VoteSection = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommentContainer = styled.div`
  margin: 16px 10px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;

  & > svg {
    margin-right: 5px;
    font-size: 17px;
  }
`;

const StatGroup = styled.div`
  display: flex;
  align-items: center;

  & > ${StatItem} + ${StatItem} {
    margin-left: 16px;
  }
`;

const StyleCreateComment = styled.div`
  margin: 16px 0px;
`;

const CommentWrapper = styled.div`
  width: 100%;
`;

const Page = () => {
   const pathname = usePathname();
   const dashcamId = pathname.split('/').pop();

   const [dashCamDetail, setDashCamDetail] = useState<DashCamDetail | null>(null);

   const loadDetail = async () => {
      try {
         const data = await fetchDashCamDetail(dashcamId as string); // API 호출
         setDashCamDetail(data);
      } catch (error) {
         console.error('Failed to load dash cam detail:', error);
      }
   };
   useEffect(() => {
      loadDetail();
   });

   if (!dashCamDetail) {
      return <div>Loading...</div>;
   }

   return (
      <Container>
         <ContentContainer>
            <InnerContentContainer>
               <LeftColumn>
                  <DashCamContent
                     id={dashCamDetail.id}
                     member={dashCamDetail.member}
                     title={dashCamDetail.title}
                     createdAt={dashCamDetail.createdAt}
                     videoUrl={dashCamDetail.videoUrl}
                     content={dashCamDetail.content}
                     mentionedLeagues={dashCamDetail.mentionedLeagues} />
               </LeftColumn>
               <RightColumn>
                  <CommentsSection>
                     <StatsContainer>
                        <StatItem>
                           <LiaCommentDots /> {dashCamDetail.commentCount}
                        </StatItem>
                        <StatGroup>
                           <StatItem>
                              <FaRegEye /> {dashCamDetail.viewCount}
                           </StatItem>
                           <StatItem>
                              <FaRegHeart /> {dashCamDetail.likeCount}
                           </StatItem>
                        </StatGroup>
                     </StatsContainer>
                     <StyleCreateComment>
                        <CreateComment boardId={dashCamDetail.id} isReply={false} commentId="" onCommentAdded={loadDetail} />
                     </StyleCreateComment>
                     {dashCamDetail.comments.map((comment) => (
                        <React.Fragment key={comment.id}>
                           {comment.status === CommentStatus.ACTIVE ? (
                              <CommentWrapper>
                                 <Comment
                                    id={comment.id}
                                    boardId={dashCamDetail.id}
                                    avatarUrl={comment.member.profileUrl}
                                    userName={comment.member.nickname}
                                    userDetail={comment.member.carTitle}
                                    text={comment.content}
                                    time={comment.createdAt}
                                    onCommentAdded={loadDetail}
                                 />
                              </CommentWrapper>
                           ) : (
                              "없는 댓글"
                           )}
                           {comment.replies.length > 0 && (
                              comment.replies.map((reply) => (
                                 <Reply
                                    key={reply.id}
                                    avatarUrl={reply.member.profileUrl}
                                    userName={reply.member.nickname}
                                    userDetail={reply.member.carTitle}
                                    text={reply.content}
                                    time={reply.createdAt}
                                 />
                              ))
                           )}
                        </React.Fragment>
                     ))}
                  </CommentsSection>
                  <VoteSection>
                     <Vote options={dashCamDetail.options} />
                  </VoteSection>
               </RightColumn>
            </InnerContentContainer>
         </ContentContainer>
      </Container>
   );
};

export default Page;