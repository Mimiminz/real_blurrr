"use client";

import React, { useEffect, useCallback, useState } from 'react';
import * as S from "@/styles/channel/dashCam/channelDashCamDetailPage.styled";
import Vote from '@/components/channel/dashcam/detail/Vote';
import DashCamContent from '@/components/channel/dashcam/detail/DashCamContent';
import CommentList from "@/components/common/UI/comment/CommentList";
import { useAuthStore } from "@/store/authStore";
import { fetchCommentList } from "@/api/comment";
import { fetchComment } from "@/types/commentTypes";
import Loading from '@/app/loading';

export default function ChannelDashCamDetailPage({ params }: {
   params: { dashcamId: string };
}) {
   const dashCamDetailId = params.dashcamId;
   const { isLoggedIn } = useAuthStore();

   const [commentList, setCommentList] = useState<fetchComment | null>(null);
   const [commentCount, setCommentCount] = useState(0);
   const [hasOptions, setHasOptions] = useState(true);

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
      loadCommentDetail();
   }, [loadCommentDetail]);

   const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가

   useEffect(() => {
      setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
   }, []);

   if (!isMounted) {
      return <Loading />;
   }


   return (
      <S.Container>
            <S.InnerContentContainer>
               <S.LeftColumn>
                  <DashCamContent dashCamDetailId={dashCamDetailId} setCommentCount={setCommentCount} />
               </S.LeftColumn>
               <S.RightColumn>
                  {hasOptions && (
                     <S.VoteSection>
                        <Vote voteId={dashCamDetailId} onOptionsCheck={setHasOptions} />
                     </S.VoteSection>
                  )}
                  <S.CommentSection $hasOptions={hasOptions}>
                     <CommentList
                        comments={commentList?.comments || []}
                        commentCount={commentList?.commentCount || commentCount}
                        boardId={dashCamDetailId}
                        leagueId=""
                        isLeague={false}
                        onCommentAdded={loadCommentDetail}
                        boardAuthor="" // 필요시 작성자 정보를 추가
                     />
                  </S.CommentSection>
               </S.RightColumn>
            </S.InnerContentContainer>
      </S.Container>
   );
}
