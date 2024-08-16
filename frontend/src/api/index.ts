import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '../store/authStore';
import { refreshAccessToken } from './auth';

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
  (response: AxiosResponse) => {
    // 정규 표현식 패턴을 RegExp 객체로 정의
    const targetEndpoints = [/^\/v1\/channels/, /^\/v1\/leagues/];

    // 정규 표현식으로 경로 매칭
    if (targetEndpoints.some(endpoint => endpoint.test(response.config.url || ''))) {
      if (response.status === 204) {
        response.data = {
          totalPages: 0,
          totalElements: 0,
          pageNumber: 0,
          pageSize: 0,
          content: [],
        };
      }
      if (!response.data) {
        response.data = {
          totalPages: 0,
          totalElements: 0,
          pageNumber: 0,
          pageSize: 0,
          content: [],
        };
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);
          useAuthStore.getState().setAccessToken(accessToken);
          sessionStorage.setItem('accessToken', accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          useAuthStore.getState().clearAuthState();
          window.location.href = '/login';
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

// 이메일 인증번호 전송
export const requestEmailVerificationCode = async (
  email: string,
  type: 'password_change' | 'signup') => {
  try {
    const response = await api.get(`/v1/auth/email/code/${email}`, {
      params: {
        type: type,
      },
    });
    return response.data;
  } catch (error) {
    console.error('이메일 인증번호 전송 중 오류가 발생했습니다.', error);
    throw error;
  }
};

// 인증번호 확인
export const verifyEmailCode = async (email: string, authCode: string, type: string) => {
  try {
    const response = await api.post('/v1/auth/email/code', { email, authCode, type });
    return response.data;
  } catch (error) {
    // console.error('인증번호 확인 중 오류가 발생했습니다.', error);
    // throw error;
  }
};


