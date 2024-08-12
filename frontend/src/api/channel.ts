import api from "@/api/index";
import {
  Vote,
  PostDataInfo,
  Channels,
  DashCamList,
  DashCamDetail,
  PostDetail,
  PostInfo,
  CreateOption,
  ChannelInfo,
  BoastInfo,
  Mentioned,
  Video
} from '@/types/channelType';

// 팔로잉한 채널 목록 데이터를 가져오는 함수
export const fetchFollowingChannels = async (): Promise<Channels[]> => {
  try {
    const response = await api.get("/v1/channels/followers");

    if (response.status === 204) {
      return []; // 검색 결과가 없는 경우 빈 배열 반환
    }

    return response.data.data.channels;
  } catch (error) {
    console.error("Error fetching following channels data:", error);
    throw error;
  }
};

// 생성한 채널 목록 데이터를 가져오는 함수
export const fetchCreatedChannels = async (): Promise<Channels[]> => {
  try {
    const response = await api.get("/v1/channels/created");

    if (response.status === 204) {
      return [];
    }

    return response.data.data.channels;
  } catch (error) {
    console.error("Error fetching created channels data:", error);
    throw error;
  }
};

// 전체 채널 목록 데이터를 가져오는 함수
export const fetchChannels = async (): Promise<ChannelInfo | null> => {
  try {
    const response = await api.get("/v1/channels");

    if (response.status === 204) {
      return null; // 데이터가 없을 때 null 반환
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching channels data:", error);
    throw error;
  }
};

// 채널 태그 검색
export const fetchSearchKeywords = async (
  keyword: string,
  pageNumber: number,
): Promise<Channels[]> => {
  try {
    const response = await api.get("/v1/channels/search", {
      params: {
        keyword,
        pageNumber, 
      },
    });

    if (response.status === 204) {
      return [];
    }

    console.log(`main channel tag search : ${response.data.data.channels}`);
    return response.data.data.content;
  } catch (error) {
    console.error("Error fetching channels data:", error);
    throw error;
  }
};

// 채널 정보 데이터 가져오는 함수
export const fetchChannelInfo = async (
  channelId: string
): Promise<PostInfo> => {
  try {
    const response = await api.get(`/v1/channels/${channelId}`);
    return response.data.data.channel;
  } catch (error) {
    console.error("Error following channel:", error);
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
        pageNumber, 
        criteria,
      },
    });
    
    return response.data.data;
    
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
    const response = await api.get(
      `/v1/channels/${channelId}/boards/${boardId}`
    );
    console.log("channelPostDetail call");
    return response.data.data.channelBoard;
  } catch (error) {
    console.error("Error fetching channel post detail:", error);
    throw error;
  }
};

// 채널 게시글 생성 함수
export const fetchPostWrite = async (
  channelId: string,
  title: string,
  content: string,
  mentionedLeagueNames: string[]
) => {
  try {
    const response = await api.post(`/v1/channels/${channelId}/boards`, {
      title: title,
      content: content,
      mentionedLeagueNames: mentionedLeagueNames
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 채널 게시글 생성 시 태그 검색 함수
export const fetchTags = async ( name: string ) => {
  try {
    const response = await api.get(`/v1/leagues/search`, {
      params: {
        name,
      },
    });
    console.log(response.data.data.leagues);
    return response.data.data.content;
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
    console.error("Error following channel:", error);
    throw error;
  }
};

export const unfollowChannel = async (channelId: string) => {
  try {
    const response = await api.delete(`/v1/channels/${channelId}/followers`);
    return response.data;
  } catch (error) {
    console.error("Error unfollowing channel:", error);
    throw error;
  }
};

// 블랙박스 목록 데이터를 가져오는 함수
export const fetchDashCams = async (
  keyword: string,
  pageNumber: number,
  criteria: string
): Promise<DashCamList> => {
  try {
    const response = await api.get("/v1/channels/dashcams/boards", {
      params: {
        keyword,
        pageNumber,
        criteria,
      },
    });

    return response.data.data;
    
  } catch (error) {
    console.error("Error fetching dash cam data:", error);
    throw error;
  }
};

// 블랙박스 게시물 상세 정보를 가져오는 함수
export const fetchDashCamDetail = async (
  boardId: string
): Promise<DashCamDetail> => {
  try {
    const response = await api.get(`/v1/channels/dashcams/boards/${boardId}`);
    console.log(response.data);
    return response.data.board;
  } catch (error) {
    console.error("Error fetching dash cam detail:", error);
    throw error;
  }
};

// 블랙박스 투표 확인
export const fetchVote = async (boardId: string): Promise<Vote> => {
  try {
    const response = await api.get(`/v1/channels/board/${boardId}/votes`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching vote:", error);
    throw error;
  }
};

// 블랙박스 투표
export const addVote = async (boardId: string, optionId: string) => {
  try {
    const response = await api.post(
      `/v1/channels/board/${boardId}/votes/${optionId}`
    );
    if (response.data.state == 201) {
      console.log(`vote success`);
      return true;
    } else if (response.data.state == 400) {
      console.log(`이미 투표함`);
      return true;
    }
    console.log(`vote fail`);
    return false;
  } catch (error) {
    console.error("Error fetching vote:", error);
    throw error;
  }
};

// 블랙박스 채널 게시글 생성 함수
export const fetchDashCamWrite = async (
  title: string,
  content: string,
  voteTitle: string,
  option: CreateOption[],
  videos: Video[],
  mentionedLeagueNames: string[]
) => {
  try {
    // console.log({
    //   title: title,
    //   content: content,
    //   voteTitle: voteTitle,
    //   options: option,
    //   videos: videos,
    //   mentionedLeagueNames: mentionedLeagueNames
    // });
    const response = await api.post(`/v1/channels/dashcams/boards`, {
      title: title,
      content: content,
      voteTitle: voteTitle,
      options: option,
      videos: videos,
      mentionedLeagueNames: mentionedLeagueNames
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 동영상 presigned url 받는 함수
export const videoPresigned = async (fileName: string): Promise<{ noQueryParamUrl: string; fullUrl: string }> => {
  try {
    const response = await api.get(`/v1/channels/dashcams/boards/aws`, {
      params: { fileName },
    });

    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching video url:", error);
    throw error;
  }
};

// S3에 동영상 업로드 하는 함수
export const S3UploadVideo = async (uploadUrl: string, file: File): Promise<void> => {
  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });

    if (!response.ok) {
      throw new Error('Failed to upload video to S3');
    }

    console.log('Successfully uploaded video to S3');
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};


// 내 차 자랑 목록 데이터를 가져오는 함수
export const fetchBoast = async (
  keyword: string,
  pageNumber: number,
  criteria: string
): Promise<BoastInfo> => {
  try {
    const response = await api.get("/v1/channels/mycar/boards", {
      params: {
        keyword,
        pageNumber,
        criteria,
      },
    });

    console.log(response.data);
    console.log(`mycar : ${response.data.content}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching boast data:", error);
    throw error;
  }
};

// 내 차 자랑 상세 데이터를 가져오는 함수
export const fetchBoastDetail = async (
  id: string
): Promise<PostDetail> => {
  try {
    const response = await api.get(`/v1/channels/mycar/boards/${id}`, {
      params: {
        id,
      },
    });

    console.log(`mycar detail: ${response.data}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching boast data:", error);
    throw error;
  }
};

// 내 차 자랑 채널 게시글 생성 함수
export const fetchBoastWrite = async (
  title: string,
  content: string,
  thumbNail: string,
  mentionedLeagueNames: string[]
) => {
  try {
    const response = await api.post(`/v1/channels/mycar/boards`, {
      title: title,
      content: content,
      boardType: "MYCAR",
      thumbNail: thumbNail,
      mentionedLeagueNames: mentionedLeagueNames
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchChannelBoardDelete = async (boardId: string) => {
  try {
    const response = await api.delete(`/v1/boards/${boardId}`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};