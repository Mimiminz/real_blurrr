import { MyHeartItem, MyPostItem } from '@/types/myPageTypes';
import api from '../api/index'
import axios from 'axios';
  
export const checkPassword = async (password: string, accessToken: string): Promise<boolean> => {
try {
    const response = await api.post('/v1/members/password', { password }, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    });
    return response.data;
} catch (error) {
    console.error('Password check failed:', error);
    throw new Error('Failed to check password');
}
};

export const ChangeMyPassword = async (oldPassword: string, newPassword: string, newPasswordCheck: string, accessToken: string): Promise<boolean> => {
    try {
        const response = await api.put('/v1/members/password', { oldPassword, newPassword, newPasswordCheck }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        });

        return response.data === true;
    } catch (error) {
        console.error('Password check failed:', error);
        throw new Error('Failed to check password');
    }
    };

//내 좋아요 목록

export const getMyHeartLeagueList = async (accessToken: string, pageNumber = 0, criteria = 'TIME'): Promise<MyHeartItem[]> => {
    try {
        const response = await api.get(`/v1/members/likes/leagues/boards`, {
            params: { pageNumber, criteria },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data.boards;
        
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw new Error('Failed to fetch league boards');
    }
};

export const getMyHeartChannelList = async (accessToken: string, pageNumber = 0, criteria = 'TIME'): Promise<MyHeartItem[]> => {
    try {
        const response = await api.get(`/v1/members/likes/channels/boards`, {
            params: { pageNumber, criteria },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data.boards;
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw new Error('Failed to fetch channel boards');
    }
};


//내 게시글 목록

export const getMyPostLeagueList = async (accessToken: string, pageNumber = 0, criteria = 'TIME'): Promise<MyPostItem[]> => {
    try {
        const response = await api.get(`/v1/members/leagues/boards`, {
            params: { pageNumber, criteria },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data.boards;
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw new Error('Failed to fetch league boards');
    }
};

export const getMyPostChannelList = async (accessToken: string, pageNumber = 0, criteria = 'TIME'): Promise<MyPostItem[]> => {
    try {
        const response = await api.get(`/v1/members/channels/boards`, {
            params: { pageNumber, criteria },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data.boards;
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw new Error('Failed to fetch channel boards');
    }
};

// 프로필 수정
export const updateProfile = async (fileName: string, nickname: string, imgChange: boolean) => {
    const response = await api.put('/v1/members', {
        fileName,
        nickname,
        imgChange,
    });
    return response.data;
};

// 이미지 S3 업로드
export const uploadImageToS3 = async (profileUrl: string, file: File) => {
    try {
        const response = await axios.put(profileUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
};