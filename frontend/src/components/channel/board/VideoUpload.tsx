import React, { useState, useRef } from "react";
import styled from "styled-components";
import { videoPresigned, S3UploadVideo } from "@/api/channel";
import { Video } from "@/types/channelType";
import { GoPaperclip } from "react-icons/go";

interface VideoUploadProps {
   videoFiles: File[];
   setVideoFiles: React.Dispatch<React.SetStateAction<File[]>>;
   noQueryParamURLs: Video[];
   setNoQueryParamURLs: React.Dispatch<React.SetStateAction<Video[]>>;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
   videoFiles,
   setVideoFiles,
   noQueryParamURLs,
   setNoQueryParamURLs
}) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);

   const onFileUpload = async (file: File) => {
      if (videoFiles.length >= 2) {
         alert("최대 2개의 비디오만 업로드할 수 있습니다.");
         return;
      }

      setIsLoading(true);
      try {
         const presignedData = await videoPresigned(file.name);
         const uploadURL = presignedData.fullUrl;
         const noQueryParamUrl = presignedData.noQueryParamUrl;

         await S3UploadVideo(uploadURL, file);

         setVideoFiles(prevFiles => [...prevFiles, file]);
         setNoQueryParamURLs(prevUrls => [
            ...prevUrls,
            { videoOrder: prevUrls.length + 1, videoUrl: noQueryParamUrl }
         ]);
      } catch (error) {
         console.error("Error uploading video:", error);
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

   return (
      <>
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
                  style={{ display: "none" }}
                  accept="video/*"
                  onChange={handleFileChange}
               />
            </VideoUploadBox>
         )}
      </>
   );
};

export default VideoUpload;

const VideoUploadBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
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
  margin-right: 5px;
`;
