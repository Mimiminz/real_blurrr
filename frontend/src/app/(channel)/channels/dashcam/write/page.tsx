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

   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title.trim() || !content.trim()) {
         alert("제목과 내용을 입력해주세요.");
         return;
      }

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
            />
            <FindTags tags={tags} setTags={setTags} />
            <EditorContainer>
               <QuillEditor content={content} setContent={setContent} setThumbNail={setThumbNail} />
            </EditorContainer>
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
                  isActive={videoFiles.length > 0}
                  onClick={(e) => {
                     if (videoFiles.length === 0) {
                        e.preventDefault();  // 폼 제출 막기
                     }
                  }}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 16px;
`;

const PageTitle = styled.h1`
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
  box-sizing: border-box;
`;

const EditorAndButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  max-width: 800px;
  gap: 15px;
`;

const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
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

const SubmitButton = styled.button<{ isActive: boolean }>`
  width: 100px;
  padding: 12px;
  background-color: ${({ isActive }) => (isActive ? "#FF900D" : "#cccccc")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  font-size: 16px;
  margin-top: 16px;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#FF900D" : "#bbbbbb")};
  }
`;