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
  Mentioned
} from '@/types/channelType';

// 팔로잉한 채널 목록 데이터를 가져오는 함수
export const fetchFollowingChannels = async (): Promise<Channels[]> => {
  try {
    const response = await api.get('/v1/channels/followers');
    
    if (response.status === 204) {
      return []; // 검색 결과가 없는 경우 빈 배열 반환
    }
    
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
    
    if (response.status === 204) {
      return []; 
    }
    
    return response.data.data.channels;
  } catch (error) {
    console.error('Error fetching created channels data:', error);
    throw error;
  }
};

// 전체 채널 목록 데이터를 가져오는 함수
export const fetchChannels = async (): Promise<ChannelInfo> => {
  try {
    const response = await api.get('/v1/channels');

    return response.data.data;

  } catch (error) {
    console.error('Error fetching channels data:', error);
    throw error;
  }
};

// 채널 태그 검색
export const fetchSearchKeywords = async (keywords: string[]): Promise<Channels[]> => {
  try {
    const params = new URLSearchParams();
    keywords.forEach(keyword => params.append('keywords', keyword));

    const response = await api.get('/v1/channels/search', {
      params,
    });

    if (response.status === 204) {
      return []; 
    }

    console.log(`main channel tag search : ${response.data.data.channels}`);
    return response.data.data.channels;
  } catch (error) {
    console.error('Error fetching channels data:', error);
    throw error;
  }
};

// 채널 정보 데이터 가져오는 함수
export const fetchChannelInfo = async (channelId: string): Promise<PostInfo>  => {
  try {
    const response = await api.get(`/v1/channels/${channelId}`);
    return response.data.data.channel;
  } catch (error) {
    console.error('Error following channel:', error);
    throw error;
  }
};

// 채널 게시글 목록 데이터를 가져오는 함수
export const fetchPosts = async (
  channelId: string,
  keyword: string,
  pageNumber: number,
  criteria: string
): Promise<PostDataInfo> => {
  try {
    const response = await api.get(`/v1/channels/${channelId}/boards`, {
      params: {
        keyword,
        pageNumber, // 페이지 번호
        criteria, // 정렬 기준
      },
    });
    console.log("channelPost call");

    if (response.status === 204) {
      return {
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0,
        content: [],
      }; // 검색 결과가 없는 경우 빈 배열 반환
    }

    // 응답 데이터가 정의되어 있는지 확인
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      console.error("Unexpected response structure:", response);
      return {
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0,
        content: [],
      };
    }
  } catch (error) {
    console.error("Error fetching channel post list:", error);
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
    console.error('Error fetching channel post detail:', error);
    throw error;
  }
};

// 채널 게시글 생성 함수
export const fetchPostWrite = async (
  channelId: string,
  title: string,
  content: string
) => {
  try {
    const response = await api.post(`/v1/channels/${channelId}/boards`, {
      title: title,
      content: content,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 채널 게시글 생성 시 태그 검색 함수
export const fetchTags = async ( keyword: string ) => {
  try {
    const response = await api.get(`/v1/channels/check/tags/${keyword}`);
    console.log(response.data.data.tags);
    return response.data.data.tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 채널 팔로우 / 언팔로우 하는 함수
export const followChannel = async (channelId: string): Promise<Mentioned[]> => {
  try {
    const response = await api.post(`/v1/channels/${channelId}/followers`);
    return response.data;
  } catch (error) {
    console.error('Error following channel:', error);
    throw error;
  }
};

export const unfollowChannel = async (channelId: string) => {
  try {
    const response = await api.delete(`/v1/channels/${channelId}/followers`);
    return response.data;
  } catch (error) {
    console.error('Error unfollowing channel:', error);
    throw error;
  }
};

// 블랙박스 목록 데이터를 가져오는 함수
export const fetchDashCams = async (keyword: string, pageNumber: number, criteria: string): Promise<DashCamList> => {
  try {
    const response = await api.get('/v1/channels/dashcams/boards', {
      params: {
        keyword,
        pageNumber, 
        criteria,   
      },
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dash cam data:', error);
    throw error;
  }
};

// 블랙박스 게시물 상세 정보를 가져오는 함수
export const fetchDashCamDetail = async (boardId: string): Promise<DashCamDetail> => {
  try {
    const response = await api.get(`/v1/channels/dashcams/boards/${boardId}`);
    console.log(response.data);
    return response.data.board;
  } catch (error) {
    console.error('Error fetching dash cam detail:', error);
    throw error;
  }
};

// 블랙박스 투표 확인
export const fetchVote = async ( boardId: string): Promise<Vote> => {
  try {
    const response = await api.get(`/v1/channels/board/${boardId}/votes`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching vote:', error);
    throw error;
  }
}

// 블랙박스 투표
export const addVote = async ( boardId: string, optionId: string)  => {
  try {
    const response = await api.post(`/v1/channels/board/${boardId}/votes/${optionId}`);
    if(response.data.state == 201){
      console.log(`vote success`);
      return true;
    }else if(response.data.state == 400){
      console.log(`이미 투표함`);
      return true;
    }
    console.log(`vote fail`);
    return false;
  } catch (error) {
    console.error('Error fetching vote:', error);
    throw error;
  }
}

// 채널 게시글 생성 함수
export const fetchDashCamWrite = async (
  title: string,
  content: string,
  option: Option,
  videos: Video,
) => {
  try {
    const response = await api.post(`/v1/channels/dashcams/boards`, {
      title: title,
      content: content,
      options: option,
      videos: videos
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const videoPresigned = async ( fileName: string ) => {
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

// 내 차 자랑 목록 데이터를 가져오는 함수
export const fetchBoast = async (keyword: string, page: number, criteria: string): Promise<BoastInfo> => {
  try {
    const response = await api.get('/v1/channels/mycar/boards', {
      params: {
        keyword,
        page, 
        criteria,   
      },
    });

    console.log(`mycar : ${response.data}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching boast data:', error);
    throw error;
  }
};