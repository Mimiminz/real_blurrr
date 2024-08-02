import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore'
import { login as loginApi } from '@/api/authApi';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUser } = useAuthStore(state => ({
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
    setUser: state.setUser,
  }));

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setSubmitting(true);
      const response = await loginApi({
        email: values.email,
        password: values.password,
      });

      const { accessToken, refreshToken } = response;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('accessToken', accessToken);

      const userResponse = await axios.get('/v1/members', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(userResponse.data);
      
      router.push('/');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        const errorMessage =
          errorResponse?.body?.detail || '로그인 요청 중 오류가 발생했습니다.';
        alert(errorMessage);
      } else {
        alert('로그인 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('유효한 이메일 형식을 입력하세요.')
            .required('이메일은 필수 입력 항목입니다.'),
          password: Yup.string()
            .matches(
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,16}$/,
              '비밀번호는 영문, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하로 입력해야 합니다.'
            )
            .required('비밀번호는 필수 입력 항목입니다.'),
          rememberMe: Yup.boolean(),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <StyledField name="email" type="email" placeholder="이메일" />
            <StyledErrorMessage name="email" component="div" />
            <StyledField name="password" type="password" placeholder="비밀번호" />
            <StyledErrorMessage name="password" component="div" />
            {/* <CheckboxLabel>
              <CheckboxField name="rememberMe" type="checkbox" />
              자동 로그인
            </CheckboxLabel> */}
            <Button type="submit" disabled={isSubmitting}>
              로그인
            </Button>
            <Div>
              <Link href="#" onClick={() => router.push('/findpassword')}>
                비밀번호를 잊으셨나요?
              </Link>
              <Link href="#" onClick={() => router.push('/signup')}>
                회원가입
              </Link>
            </Div>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 5% auto;
  padding: 2em;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2em;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledField = styled(Field)`
  margin-bottom: 1em;
  border-radius: 5px;
  padding: 0.5em;
  font-size: 1em;
  border: 1.5px solid #EEEEEE;
  
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-bottom: 1em;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const CheckboxField = styled(Field)`
  margin-right: 0.5em;
`;

const Button = styled.button`
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 0.7em;
  font-size: 1em;
  color: #fff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff5e01;
  }
`;

const Link = styled.a`
  text-align: center;
  display: block;
  margin-top: 1em;
  color: #000000;
  cursor: pointer;
  text-decoration: none;
`;

export default LoginForm;
