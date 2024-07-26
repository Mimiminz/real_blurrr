"use client";

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import DashCamContent from '@/components/channel/dashcam/detail/DashCamContent';
import CreateComment from '@/components/common/UI/comment/CreateComment';
import Comment from '@/components/common/UI/comment/Comment';
import Reply from '@/components/common/UI/comment/Reply';
import Vote from '@/components/channel/dashcam/detail/Vote';
import { LiaCommentDots } from "react-icons/lia";
import { FaRegHeart, FaRegEye } from "react-icons/fa";

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
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px 16px;
  box-sizing: border-box;
`;

const CommentsSection = styled(Section)`
  flex-grow: 1;
  height: 100%;
  margin-bottom: 16px;
  overflow-y: auto; /* 내용이 많을 때 스크롤 가능 */
`;
const VoteSection = styled(Section)``;

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
    margin-right: 4px;
    font-size: 18px;
  }
`;

const StatGroup = styled.div`
  display: flex;
  align-items: center;

  & > ${StatItem} + ${StatItem} {
    margin-left: 16px;
  }
`;

const Page = () => {
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const dashcamId = pathname.split('/').pop();

   return (
      <Container>
         <ContentContainer>
            <InnerContentContainer>
               <LeftColumn>
                  <DashCamContent />
               </LeftColumn>
               <RightColumn>
                  <CommentsSection>
                     <StatsContainer>
                        <StatItem>
                           <LiaCommentDots /> 34
                        </StatItem>
                        <StatGroup>
                           <StatItem>
                              <FaRegEye /> 1245
                           </StatItem>
                           <StatItem>
                              <FaRegHeart /> 34
                           </StatItem>
                        </StatGroup>
                     </StatsContainer>
                     <CreateComment />
                     <CommentContainer>
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
                        <Comment
                           avatarUrl="https://i.pravatar.cc/300"
                           userName="돌판"
                           userDetail="BMW M8"
                           text="무과실이 맞는데 아무래도 과실 몰릴것 같네요.."
                           time="23h"
                        />
                     </CommentContainer>
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

export default Page;
