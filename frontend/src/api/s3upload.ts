import api from '@/api/index'; 
import { 
  Vote, 
  PostDataInfo, 
  Channels, 
  DashCamList, 
  DashCamDetail, 
  PostDetail, 
  PostInfo,
  Option,
  Video,
  ChannelInfo,
  BoastInfo,
  Mentioned,
  CompletedPartType
} from '@/types/channelType';

// 파일의 청크 배열 생성 함수
export const createChunkedArray = async (
   file: File,
   chunkSize: number,
 ): Promise<Blob[]> => {
   const chunkedArray: Blob[] = [];
   let offset = 0;
 
   while (offset < file.size) {
     const chunk = file.slice(offset, offset + chunkSize);
     chunkedArray.push(chunk);
     offset += chunkSize;
   }
 
   return chunkedArray;
 };
 
// 청크 생성 이후 파일 업로드 알리는 함수
export const getIdForMultipartUpload = async (
  fileName: string,
  fileType: string,
): Promise<string> => {
  try {
    const response = await api.post('/api/s3-upload/get-id', {
      data: { fileName, fileType },
      action: 'get-id',
    });
    return response.data.UploadId;
  } catch (error) {
    console.error('Error obtaining upload ID:', error);
    throw error;
  }
};

// 동영상 presigned url 받는 함수
export const videoPresigned = async (fileName: string): Promise<string> => {
  try {
    const response = await api.get(`/v1/channels/dashcams/boards/aws`, {
      params: { fileName }
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching video url:', error);
    throw error;
  }
}

// S3에 업로드 완료 요청 발송하는 코드
export const closeMultipartUpload = async (
  fileName: string,
  uploadId: string,
  completedParts: CompletedPartType[],
): Promise<void> => {
  try {
    await api.post('/api/s3-upload/complete', {
      data: { fileName, uploadId, parts: completedParts },
      action: 'complete-upload',
    });
  } catch (error) {
    console.error('Error completing upload:', error);
    throw error;
  }
};

// 청크에 대한 업로드 URL을 가져오는 함수 (가정)
const getUploadUrlForChunk = async (
  fileName: string,
  partNumber: number,
  uploadId: string
): Promise<string> => {
  try {
    const response = await api.get('/api/s3-upload/get-url', {
      params: { fileName, partNumber, uploadId }
    });
    return response.data.uploadUrl;
  } catch (error) {
    console.error('Error getting upload URL:', error);
    throw error;
  }
};

// 비디오 업로드 전체 함수를 통해 업로드를 수행하는 함수
export const handleUpload = async (
  file: File,
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setIsUploading(true);
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  let uploadedChunk = 0; // progress를 추적하기 위한 변수
  try {
    const chunkedFile = await createChunkedArray(file, CHUNK_SIZE);
    const uploadId = await getIdForMultipartUpload(file.name, file.type);
    const uploadPromises = chunkedFile.map(async (chunk, index) => {
      const uploadUrl = await getUploadUrlForChunk(file.name, index + 1, uploadId);
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: chunk,
        headers: {
          'Content-Type': file.type,
        },
      });
      uploadedChunk++;
      const progress = Math.ceil((uploadedChunk / chunkedFile.length) * 100);
      setUploadProgress(progress);
      if (!response.ok) throw new Error('Upload failed');
      return {
        ETag: response.headers.get('ETag') ?? '',
        PartNumber: index + 1,
      };
    });

    const completedParts: CompletedPartType[] = await Promise.all(uploadPromises);
    await closeMultipartUpload(file.name, uploadId, completedParts);
    setIsUploaded(true);
  } catch (error) {
    console.error('Upload error:', error);
    setIsUploaded(false);
  } finally {
    setIsUploading(false);
    setUploadProgress(0);
  }
};
