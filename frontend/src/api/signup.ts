import api from '@/api/index';


export const signup = async (email: string, nickname: string, password: string, passwordCheck: string) => {
  try {
    const response = await api.post('/v1/auth/signup', {
      email,
      nickname,
      password,
      passwordCheck,
    });
    return response.data;
  } catch (error) {
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};