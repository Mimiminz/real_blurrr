"use client";

import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import DashCamContent from '@/components/channel/dashcam/detail/DashCamContent';
import Vote from '@/components/channel/dashcam/detail/Vote';
import { fetchDashCamDetail } from '@/api/channel';
import CommentList from "@/components/common/UI/comment/CommentList";
import { DashCamDetail } from '@/types/channelType';
import { useAuthStore } from "@/store/authStore";
import { fetchCommentList } from "@/api/comment";
import { fetchComment } from "@/types/commentTypes";


const Page = () => {
   const dashcamId = process.env.NEXT_PUBLIC_DASHCAM_ID as string;
   const { isLoggedIn, user } = useAuthStore();

   const [dashCamDetail, setDashCamDetail] = useState<DashCamDetail | null>(null);
   const [commentList, setCommentList] = useState<fetchComment | null>(null);

   const loadDetail = useCallback(async () => {
      try {
         const data = await fetchDashCamDetail(dashcamId); // API 호출
         setDashCamDetail(data);
      } catch (error) {
         console.error('Failed to load dash cam detail:', error);
         // 사용자에게 오류 메시지를 표시하거나 적절한 UI를 제공
      }
   }, [dashcamId]); // dashcamId를 의존성 배열에 포함

   const loadCommentDetail = useCallback(async () => {
      if (!isLoggedIn) return;

      try {
         const fetchCommentsList = await fetchCommentList(dashcamId);
         setCommentList(fetchCommentsList);
      } catch (error) {
         console.log(error);
      }
   }, [dashcamId, isLoggedIn]);

   useEffect(() => {
      loadDetail();
   }, [loadDetail]);

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
                     <CommentList
                        comments={commentList?.comments || []}
                        commentCount={dashCamDetail.commentCount}
                        boardId={dashcamId}
                        leagueId=""
                        isLeague={false}
                        onCommentAdded={loadCommentDetail}
                     />
                  </CommentsSection>
                  <VoteSection>
                     <Vote />
                  </VoteSection>
               </RightColumn>
            </InnerContentContainer>
         </ContentContainer>
      </Container>
   );
};

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

export default Page;