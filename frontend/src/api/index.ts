import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;

export const checkNicknameAvailability = async (nickname: string): Promise<boolean> => {
    try {
      const response = await api.get(`/v1/auth/check/nickname/${nickname}`);
      return response.data;  
    } catch (error) {
      throw new Error('닉네임 확인 중 오류가 발생했습니다.');
    }
};