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


export default function ChannelDashCamDetailPage({ params }: {
   params: { dashcamId: string };
}) {
   const dashCamDetailId = params.dashcamId;
   const { isLoggedIn } = useAuthStore();

   const [dashCamDetail, setDashCamDetail] = useState<DashCamDetail | null>(null);
   const [commentList, setCommentList] = useState<fetchComment | null>(null);

   const [hasOptions, setHasOptions] = useState(true);

   const loadDetail = useCallback(async () => {
      try {
         const data = await fetchDashCamDetail(dashCamDetailId);
         setDashCamDetail(data);

         console.log(data);
      } catch (error) {
         console.error('Failed to load dash cam detail:', error);
      }
   }, [dashCamDetailId]);

   const loadCommentDetail = useCallback(async () => {
      if (!isLoggedIn) return;

      try {
         const fetchCommentsList = await fetchCommentList(dashCamDetailId);
         setCommentList(fetchCommentsList);
      } catch (error) {
         console.log(error);
      }
   }, [dashCamDetailId, isLoggedIn]);

   useEffect(() => {
      loadDetail();
      loadCommentDetail();
   }, [loadDetail, loadCommentDetail]);

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
                     videos={dashCamDetail.videos}
                     content={dashCamDetail.content}
                     mentionedLeagues={dashCamDetail.mentionedLeagues}
                     viewCount={dashCamDetail.viewCount}
                     commentCount={dashCamDetail.commentCount}
                     likeCount={dashCamDetail.likeCount}
                     voteCount={dashCamDetail.voteCount}
                     liked={dashCamDetail.liked} />
               </LeftColumn>
               <RightColumn>
                  {hasOptions && (
                     <VoteSection>
                        <Vote voteId={dashCamDetail.id} onOptionsCheck={setHasOptions} />
                     </VoteSection>
                  )}
                  <CommentSection>
                     <CommentList
                        comments={commentList?.comments || []}
                        commentCount={commentList?.commentCount || 0}
                        boardId={dashCamDetailId}
                        leagueId=""
                        isLeague={false}
                        onCommentAdded={loadCommentDetail}
                        boardAuthor={dashCamDetail.member.nickname}
                     />
                  </CommentSection>
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
  flex: 1.3;
  margin-right: 20px;
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

const CommentSection = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0px 20px 20px;
  height: 500px;
  overflow-y: auto; /* 내용이 많을 때 스크롤 가능 */
`;

const VoteSection = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;