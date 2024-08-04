import api from './index';

interface LoginRequest {
    email: string;
    password: string;
}
  
interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}
  
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
const response = await api.post('/v1/auth/signin', data);
return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
const response = await api.post('/v1/auth/reissue', { refreshToken });
return response.data;
};