'use client';

import Comment from '@/components/common/UI/comment/Comment';
import CreateComment from '@/components/common/UI/comment/CreateComment';
import Reply from '@/components/common/UI/comment/Reply';
import BoardDetailTitle from '@/components/channel/board/BoardDetailTitle';
import React, { useState } from 'react';
import { LiaCommentDots } from 'react-icons/lia';
import styled from "styled-components";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useRouter, useSearchParams } from "next/navigation";

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #bebebe;
`;

const CommentNumber = styled.div`
  svg {
    margin-right: 5px;
  }
`;

const StyleCreateComment = styled.div`
  margin : 16px 0px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  border-top: 1px solid #bebebe;
`;

const HeartButton = styled.button`
  margin: 5px 0px 20px auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #666;
  display: flex;
  justify-content: flex-end;

  &:hover {
    color: #666;
  }
`;
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
   const [isLiked, setIsLiked] = useState(false);
   const router = useRouter();
   const params = useSearchParams();
   const channelId = params.get('channelId');
   const boardId = params.get('boardId');

   const toggleLike = () => {
      setIsLiked(!isLiked);
      console.log(router);
      console.log(params);
      console.log(boardId);
   };

   return (
      <>
         <BoardDetailTitle
            title="오늘 현대 GV70 샀다 질문 받는다..."
            date="2024.07.17"
            views={1019}
            likes={142}
            username="전상현"
            avatarUrl="https://i.pravatar.cc/30"
            authorCarInfo="벤츠 GLS 600 4MATIC MANUFAKTUR 2024"
            tags={["현대", "제네시스"]}
         />
         <Content>
            {channelId}
         </Content>
         <HeartButton onClick={toggleLike}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
         </HeartButton>
         <CommentContainer>
            <CommentNumber>
               <LiaCommentDots />8
            </CommentNumber>
            <StyleCreateComment>
               <CreateComment />
            </StyleCreateComment>
            <Comment
               avatarUrl="https://i.pravatar.cc/30"
               userName="돌판"
               userDetail="BMW M8"
               text="무과실이 맞는데 아무래도 과실 몰릴것 같네요.dfawefawtfawerfawv eravwrwaerwaetferwavfwervawbawrnsrysebrtaeawegrawgawgrgedgawsrg."
               time="23h"
            />
            <Reply
               avatarUrl="https://i.pravatar.cc/30"
               userName="해결사요"
               userDetail="BMW M8"
               text="무과실이 맞는데 아무래도 과실 몰릴것 같네요."
               time="6h"
            />
         </CommentContainer>
      </>
   );
}

export default BoardDetailPage;
