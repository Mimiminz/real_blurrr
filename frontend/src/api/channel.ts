import api from '@/api/index'; 
import { DashCams, DashCamDetail } from '@/types/channelType';

// 블랙박스 목록 데이터를 가져오는 함수
export const fetchDashCams = async (pageNumber: number, criteria: string): Promise<DashCams[]> => {
   try {
     const response = await api.get('/v1/channels/dashcams/boards', {
       params: {
         pageNumber, // 쿼리 매개변수: 페이지 번호
         criteria,   // 쿼리 매개변수: 정렬 기준
       },
     });
     return response.data.data.boards;
   } catch (error) {
     console.error('Error fetching dash cam data:', error);
     throw error;
   }
};

// 블랙박스 게시물 상세 정보를 가져오는 함수
export const fetchDashCamDetail = async (boardId: string): Promise<DashCamDetail> => {
  try {
    const response = await api.get<DashCamDetail>(`/v1/channels/dashcams/boards/${boardId}`);
    console.log(response.data);
    return response.data.board;
  } catch (error) {
    console.error('Error fetching dash cam detail:', error);
    throw error;
  }
};