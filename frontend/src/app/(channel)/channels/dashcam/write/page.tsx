"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import styled from 'styled-components';
import QuillEditor from '@/components/channel/board/QuillEditor';
import { fetchDashCamWrite, fetchTags, videoPresigned, S3UploadVideo } from '@/api/channel';
import { Mentioned, CreateOption, Video } from '@/types/channelType';
import DraggableVotePopup from '@/components/channel/dashcam/DraggableVotePopup';
import { GoPaperclip } from "react-icons/go";

export default function WritePage() {
   const router = useRouter();
   const suggestionsRef = useRef<HTMLDivElement>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [tags, setTags] = useState<string[]>([]);
   const [tagInput, setTagInput] = useState("");
   const [tagSuggestions, setTagSuggestions] = useState<Mentioned[]>([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(-1);

   const [videoFiles, setVideoFiles] = useState<File[]>([]);
   const [noQueryParamURLs, setNoQueryParamURLs] = useState<Video[]>([]);

   const [uploadProgress, setUploadProgress] = useState(0);
   const [isUploading, setIsUploading] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [showPopup, setShowPopup] = useState(false);
   const [voteOptions, setVoteOptions] = useState<CreateOption[]>([]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   };

   const handleTagInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);

      if (e.target.value.trim()) {
         try {
            const suggestions = await fetchTags(e.target.value.trim());
            setTagSuggestions(suggestions || []);
            setShowSuggestions(true);
            console.log("Tag suggestions:", suggestions);
         } catch (error) {
            console.error("Error fetching tag suggestions:", error);
            setTagSuggestions([]);
         }
      } else {
         setTagSuggestions([]);
         setShowSuggestions(false);
      }
   }, []);

   const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault();
         if (highlightedIndex >= 0 && tagSuggestions.length > 0) {
            const selectedTag = tagSuggestions[highlightedIndex];
            if (tags.length < 3 && !tags.some(tag => tag === selectedTag.name)) {
               setTags([...tags, selectedTag.name]);
               setTagInput("");
               setShowSuggestions(false);
            }
         } else if (tagInput.trim() && tags.length < 3 && !tags.some(tag => tag === tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
            setShowSuggestions(false);
         }
      } else if (e.key === "ArrowDown") {
         e.preventDefault();
         setHighlightedIndex((prevIndex) => (prevIndex + 1) % tagSuggestions.length);
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
         setHighlightedIndex((prevIndex) => (prevIndex + tagSuggestions.length - 1) % tagSuggestions.length);
      }
   };

   const handleTagRemove = useCallback((tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
   }, [tags]);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title.trim() || !content.trim()) {
         alert("제목과 내용을 입력해주세요.");
         return;
      }

      try {
         console.log(noQueryParamURLs);
         await fetchDashCamWrite(title, content, "투표 제목", voteOptions, noQueryParamURLs, tags);
         router.push(`/channels/dashcams`);
      } catch (error) {
         console.error("Error submitting post:", error);
      }
   };

   const handleTagClick = useCallback((suggestion: Mentioned) => {
      if (tags.length < 3 && !tags.some(tag => tag === suggestion.name)) {
         setTags([...tags, suggestion.name]);
         setTagInput("");
         setShowSuggestions(false);
      }
   }, [tags]);

   const onFileUpload = async (file: File) => {
      if (videoFiles.length >= 3) {
         alert("최대 3개의 비디오만 업로드할 수 있습니다.");
         return;
      }

      setIsLoading(true);
      try {
         // Get presigned URL
         const presignedData = await videoPresigned(file.name);
         const uploadURL = presignedData.fullUrl;
         const noQueryParamUrl = presignedData.noQueryParamUrl;

         // Upload video to S3
         await S3UploadVideo(uploadURL, file);

         // Set video URL for rendering
         setVideoFiles([...videoFiles, file]);
         setNoQueryParamURLs([...noQueryParamURLs, { videoUrl: noQueryParamUrl }]);

         // Add noQueryParamUrl to videos
         setIsUploading(true);
      } catch (error) {
         console.error('Error uploading video:', error);
      } finally {
         setIsLoading(false);
         setUploadProgress(0);
      }
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         onFileUpload(e.target.files[0]);
      }
   };

   const triggerFileInput = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
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
            <TagInputContainer ref={suggestionsRef}>
               <Input
                  name="tagInput"
                  placeholder="리그를 입력 후 엔터키를 눌러 추가하세요. 최대 3개까지 가능합니다."
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
               />
               {showSuggestions && tagSuggestions.length > 0 && (
                  <SuggestionsContainer>
                     {tagSuggestions.map((suggestion, index) => (
                        <Suggestion
                           key={suggestion.name}
                           onMouseDown={() => handleTagClick(suggestion)}
                           highlighted={index === highlightedIndex ? 1 : 0}
                        >
                           {suggestion.name}
                        </Suggestion>
                     ))}
                  </SuggestionsContainer>
               )}
               <TagsContainer>
                  {tags.map(tag => (
                     <Tag key={tag}>
                        {tag}
                        <RemoveTagButton onClick={() => handleTagRemove(tag)}>x</RemoveTagButton>
                     </Tag>
                  ))}
               </TagsContainer>
            </TagInputContainer>
            <EditorContainer>
               <QuillEditor content={content} setContent={setContent} />
            </EditorContainer>
            {isLoading ? (
               <>
                  <div>업로드 중입니다...</div>
                  <div>{uploadProgress}%</div>
               </>
            ) : (
               <VideoUploadBox>
                  {videoFiles.map((file, index) => (
                     <VideoFile key={index}>
                        <FileInfo>
                           <StyledPaperclip size={14} />
                           {file.name}
                        </FileInfo>
                        <RemoveButton onClick={() => {
                           const newFiles = videoFiles.filter((_, i) => i !== index);
                           setVideoFiles(newFiles);
                           setNoQueryParamURLs(noQueryParamURLs.filter((_, i) => i !== index));
                        }}>✕</RemoveButton>
                     </VideoFile>
                  ))}
                  <AddVideoButton type="button" onClick={triggerFileInput}>+ 동영상</AddVideoButton>
                  <input
                     id="file-upload"
                     type="file"
                     ref={fileInputRef}
                     style={{ display: 'none' }}
                     accept="video/*"
                     onChange={handleFileChange}
                  />
               </VideoUploadBox>
            )}
            <EditorAndButtonContainer>
               {voteOptions.length > 0 ? (
                  <SubmitButton type="submit">작성</SubmitButton>
               ) : (
                  <SubmitButton type="button" onClick={togglePopup}>투표 생성</SubmitButton>
               )}
            </EditorAndButtonContainer>
            <div>
               {showPopup && (
                  <DraggableVotePopup
                     title="드래그 앤 드롭 팝업"
                     content={<div>이 팝업은 드래그 앤 드롭 가능합니다.</div>}
                     onClose={togglePopup}
                     onOptionsChange={(newOptions: CreateOption[]) => setVoteOptions(newOptions)}
                  />
               )}
            </div>
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

const TagInputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  position: relative;
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  z-index: 1000;
  top: 40px; /* Adjust this value if needed */
`;

const Suggestion = styled.div<{ highlighted: number }>`
  padding: 10px;
  background-color: ${({ highlighted }) => (highlighted === 1 ? '#eee' : 'white')};
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 15px;
`;

const RemoveTagButton = styled.span`
  margin-left: 5px;
  cursor: pointer;
  color: #888;
`;

const EditorAndButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
`;

const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
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

const VideoUploadBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const VideoFile = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 8px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  margin-left: 8px;
  cursor: pointer;
`;

const AddVideoButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const StyledPaperclip = styled(GoPaperclip)`
  font-size: 16px;
  margin-right: 5px; /* 아이콘과 텍스트 사이의 간격 조정 */
`;
