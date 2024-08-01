import api from '@/api/index'; 
import { Channels, DashCams, DashCamDetail, PostData, PostDetail } from '@/types/channelType';

// 전체 채널 목록 데이터를 가져오는 함수
export const fetchChannels = async (): Promise<Channels[]> => {
  try {
    const response = await api.get('/v1/channels');
    return response.data.data.channels;
  } catch (error) {
    console.error('Error fetching channels data:', error);
    throw error;
  }
};

// 팔로잉한 채널 목록 데이터를 가져오는 함수
export const fetchFollowingChannels = async (): Promise<Channels[]> => {
  try {
    const response = await api.get('/v1/channels/followers');
    return response.data.data.channels;
  } catch (error) {
    console.error('Error fetching following channels data:', error);
    throw error;
  }
};

// 생성한 채널 목록 데이터를 가져오는 함수
export const fetchCreatedChannels = async (): Promise<Channels[]> => {
  try {
    const response = await api.get('/v1/channels/created');
    return response.data.data.channels;
  } catch (error) {
    console.error('Error fetching created channels data:', error);
    throw error;
  }
};

// 채널 게시글 목록 데이터를 가져오는 함수
export const fetchPosts = async (channelId: string, keyword: string, pageNumber: number, criteria: string): Promise<PostData[]> => {
  try {
    const response = await api.get(`/v1/channels/${channelId}/boards`, {
      params: {
        keyword,
        pageNumber, // 페이지 번호
        criteria,   // 정렬 기준
      },
    });
    console.log('channelPost call');

    if (response.status === 204) {
      return []; // 검색 결과가 없는 경우 빈 배열 반환
    }

    // 응답 데이터가 정의되어 있는지 확인
    if (response.data && response.data.data && response.data.data.boards) {
      return response.data.data.boards;
    } else {
      console.error('Unexpected response structure:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching channel post list:', error);
    throw error;
  }
};

// 채널 게시글 상세 정보를 가져오는 함수
export const fetchChannelPostDetail = async (
  boardId: string,
  channelId: string
): Promise<PostDetail> => {
  try {
    const response = await api.get(`/v1/channels/${channelId}/boards/${boardId}`);
    console.log('channelPostDetail call')
    return response.data.data.channelBoard;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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