"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { fetchDashCamWrite } from "@/api/channel";
import FindTags from "@/components/channel/board/FindTags";
import VideoUpload from "@/components/channel/board/VideoUpload";
import DraggableVotePopup from "@/components/channel/dashcam/DraggableVotePopup";
import { CreateOption, Video } from "@/types/channelType";

const QuillEditor = dynamic(() => import('@/components/channel/board/QuillEditor'), { ssr: false });

export default function WritePage() {
   const router = useRouter();

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [tags, setTags] = useState<string[]>([]);
   const [videoFiles, setVideoFiles] = useState<File[]>([]);
   const [noQueryParamURLs, setNoQueryParamURLs] = useState<Video[]>([]);
   const [showPopup, setShowPopup] = useState(false);
   const [voteOptions, setVoteOptions] = useState<CreateOption[]>([]);
   const [thumbNail, setThumbNail] = useState<string | null>(null);
   const [voteTitle, setVoteTitle] = useState<string>("");

   const [titleError, setTitleError] = useState("");
   const [contentError, setContentError] = useState("");

   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;

      if (newTitle.length > 35) {
         setTitleError("제목은 35자 이내로 작성해주세요.");
      } else {
         setTitleError(""); // 35자 이내면 오류 메시지 제거
      }

      setTitle(newTitle);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let hasError = false;

      if (!title.trim()) {
         setTitleError("제목을 작성해주세요.");
         hasError = true;
      } else if (title.length > 35) {
         hasError = true; // 35자 제한 오류는 handleTitleChange에서 처리
      }

      if (!content.trim()) {
         setContentError("본문을 작성해주세요.");
         hasError = true;
      } else {
         setContentError(""); // 유효한 경우 오류 메시지 초기화
      }

      if (hasError) return;

      try {
         await fetchDashCamWrite(title, content, "투표 제목", voteOptions, noQueryParamURLs, tags);
         router.push(`/channels/dashcam`);
      } catch (error) {
         console.error("Error submitting post:", error);
      }
   };

   const togglePopup = () => {
      setShowPopup(!showPopup);
   };

   return (
      <Container>
         <PageTitle>블랙박스 게시글 작성</PageTitle>
         <form onSubmit={handleSubmit}>
            <Input
               name="titleInput"
               placeholder="제목을 입력해주세요."
               value={title}
               onChange={handleTitleChange}
               $isError={!!titleError}
            />
            {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
            <FindTags tags={tags} setTags={setTags} />
            <EditorContainer $isError={!!contentError}>
               <QuillEditor content={content} setContent={setContent} setThumbNail={setThumbNail} />
            </EditorContainer>
            {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
            <VideoUpload
               videoFiles={videoFiles}
               setVideoFiles={setVideoFiles}
               noQueryParamURLs={noQueryParamURLs}
               setNoQueryParamURLs={setNoQueryParamURLs}
            />
            <EditorAndButtonContainer>
               {voteOptions.length > 0 ? (
                  <VoteButton type="button" onClick={togglePopup}>투표 변경</VoteButton>
               ) : (
                  <VoteButton type="button" onClick={togglePopup}>투표 생성</VoteButton>
               )}
               <SubmitButton
                  type="submit"
                  onClick={(e) => { }}
               >
                  작성
               </SubmitButton>
            </EditorAndButtonContainer>
            {showPopup && (
               <DraggableVotePopup
                  title="투표 생성"
                  content={<div>원하는 옵션의 투표를 생성해보세요.</div>}
                  onClose={togglePopup}
                  onOptionsChange={(newOptions: CreateOption[]) => setVoteOptions(newOptions)}
                  onVoteTitleChange={(newTitle: string) => setVoteTitle(newTitle)}
                  initialOptions={voteOptions}
                  initialVoteTitle={voteTitle}
               />
            )}
         </form>
      </Container>
   );
};

const Container = styled.div`
  padding: 50px 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  max-width: 100%; /* 기본적으로 전체 너비 사용 */
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 750px; /* 태블릿 이상에서는 750px */
  }

  @media (min-width: 1024px) {
    max-width: 1000px; /* 데스크탑에서는 1000px */
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Input = styled.input<{ $isError: boolean }>`
   width: 100%;
   padding: 10px;
   margin-bottom: 8px;
   border: 1px solid ${({ $isError }) => ($isError ? "red" : "#ddd")};
   border-radius: 5px;
   box-sizing: border-box;
`;

const EditorAndButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-top: 24px;
`;

const EditorContainer = styled.div<{ $isError: boolean }>`
   width: 100%;
   max-width: 100%;
   margin-bottom: 8px;
   box-sizing: border-box;
   border: 1px solid ${({ $isError }) => ($isError ? "red" : "#ddd")};
   border-radius: 5px;

   @media (min-width: 768px) {
   max-width: 750px;
   }

   @media (min-width: 1024px) {
   max-width: 1000px;
   }
`;

const VoteButton = styled.button`
  width: 100px;
  padding: 12px;
  background-color: #ffa600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;

  &:hover {
    background-color: #FF900D;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 12px;
  background-color: #FF900D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;

  &:hover {
    background-color: #FF900D;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0 0 16px; /* 여백 추가 */
  text-align: left; /* 왼쪽 정렬 */
`;