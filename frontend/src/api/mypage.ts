import { MyHeartItem } from '@/types/myHeartTypes';
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

export const getMyHeartList = async (accessToken: string, pageNumber = 0, criteria = 'TIME'): Promise<MyHeartItem[]> => {
    try {
        const response = await api.get(`/v1/members/likes/boards`, {
            params: { pageNumber, criteria },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.boards;
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw new Error('Failed to fetch heart boards');
    }
};
