"use client";

import React from 'react';
import styled from 'styled-components';
import QuillEditor from '../../../../../../components/channel/board/QuillEditor';
import Breadcrumb from '../../../../../../components/common/UI/BreadCrumb';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 16px;
`;

const BreadcrumbContainer = styled.div`
  width: 100%; /* Full width */
  max-width: 1000px;
  margin-bottom: 16px; /* Space between Breadcrumb and content */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box; /* 추가 */
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  box-sizing: border-box; /* 추가 */
`;

const FileInputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box; /* 추가 */
`;

const FileInput = styled.div`
  width: 100%; /* 추가 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 8px;
  box-sizing: border-box; /* 추가 */
`;

const SubmitButton = styled.button`
  width: 10%;
  max-width: 800px;
  padding: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Page = () => {
   return (
      <Container>
         <BreadcrumbContainer>
            <Breadcrumb channel="채널" subChannel="아무 채널" channelUrl="/channels" />
         </BreadcrumbContainer>
         <Title>블랙박스 채널 게시글 작성</Title>
         <Input placeholder="제목을 입력해주세요." />
         <Input placeholder="태그를 입력해주세요." />
         <EditorContainer>
            <QuillEditor />
         </EditorContainer>
         <FileInputContainer>
            <FileInput>video.mp4</FileInput>
            <FileInput>첨부파일</FileInput>
         </FileInputContainer>
         <SubmitButton>작성</SubmitButton>
      </Container>
   );
};

export default Page;
