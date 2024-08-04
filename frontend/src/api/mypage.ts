import { MyHeartListResponse } from '@/types/myHeartTypes';
import api from '../api/index'
import axios from 'axios';

interface CheckPasswordResponse {
    isCorrect: boolean;
  }
  
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


export const getMyHeartList = async (accessToken: string | null): Promise<MyHeartListResponse> => {
if (!accessToken) {
    throw new Error('Accesstoken이 필요합니다.');
}

try {
    const response = await api.get<MyHeartListResponse>(`/v1/boards/likes`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
    });
    return response.data;
} catch (error) {
    if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.detail || 'Failed to fetch data');
    }
    throw new Error('An unknown error occurred');
}
};