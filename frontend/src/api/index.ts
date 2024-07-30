import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { refreshAccessToken } from './authApi';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);
          useAuthStore.getState().setAccessToken(accessToken);
          localStorage.setItem('accessToken', accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const checkNicknameAvailability = async (nickname: string): Promise<boolean> => {
    try {
      const response = await api.get(`/v1/auth/check/nickname/${nickname}`);
      return response.data;  
    } catch (error) {
      throw new Error('닉네임 확인 중 오류가 발생했습니다.');
    }
};



