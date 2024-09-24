import api from './index';

interface LoginRequest {
    email: string;
    password: string;
}
  
interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface ChangePasswordPayload {
    email: string;
    password: string;
    passwordCheck: string;
  }
  
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
const response = await api.post('/v1/auth/signin', data);
return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
const response = await api.post('/v1/auth/reissue', { refreshToken });
return response.data;
};

export const changePassword = async (data: ChangePasswordPayload) => {
    try {
      const response = await api.put('/v1/auth/password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };