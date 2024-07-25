"use client";

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import DashCamContent from '@/components/channel/dashcam/detail/DashCamContent';
import CreateComment from '@/components/common/UI/comment/CreateComment';
import Comment from '@/components/common/UI/comment/Comment';
import Reply from '@/components/common/UI/comment/Reply';
import Vote from '@/components/channel/dashcam/detail/Vote';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 16px;
  /* background-color: #f0f0f0; */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Column direction to include Breadcrumb at top */
  width: 100%;
  max-width: 1200px;
  margin-bottom: 16px;
`;

const BreadcrumbContainer = styled.div`
  width: 100%; /* Full width */
  margin-bottom: 16px; /* Space between Breadcrumb and content */
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
`;

const CommentsSection = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px 16px;
  height: 100%;
  margin-bottom: 16px;
`;

const CommentContainer = styled.div`
  margin: 16px 10px;
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
                     <CreateComment />
                     <CommentContainer>
                        <Comment
                           avatarUrl="https://i.pravatar.cc/30"
                           username="돌판"
                           text="무과실이 맞는데 아무래도 과실 몰릴것 같네요.dfawefawtfawerfawv eravwrwaerwaetferwavfwervawbawrnsrysebrtaeawegrawgawgrgedgawsrg."
                           time="23h"
                        />
                        <Reply />
                        <Comment
                           avatarUrl="https://i.pravatar.cc/300"
                           username="돌판"
                           text="무과실이 맞는데 아무래도 과실 몰릴것 같네요.."
                           time="23h"
                        />
                     </CommentContainer>
                  </CommentsSection>
                  <Vote />
               </RightColumn>
            </InnerContentContainer>
         </ContentContainer>
      </Container>
   );
};

export default Page;
