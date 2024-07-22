import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

type Props = {}

const SignupForm = () => {
    return (
      <Container>
        <Title>로그인</Title>
        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          validationSchema={Yup.object({
            email: Yup.string().email('유효한 이메일을 입력하세요.').required('이메일은 필수 입력 항목입니다.'),
            password: Yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호는 필수 입력 항목입니다.'),
            rememberMe: Yup.boolean(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <StyledForm>
            <StyledField name="email" type="email" placeholder="이메일" />
            <StyledErrorMessage name="email" component="div" />
            <StyledField name="password" type="password" placeholder="비밀번호" />
            <StyledErrorMessage name="password" component="div" />
            <CheckboxLabel>
                <CheckboxField name="rememberMe" type="checkbox" />
                자동 로그인
            </CheckboxLabel>
            <Button type="submit">로그인</Button>
            <Div>
                <Link href="#">비밀번호를 잊으셨나요?</Link>
                <Link href="#">회원가입</Link>
            </Div>
          </StyledForm>
        </Formik>
      </Container>
    );
  };

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  background: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;

`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledField = styled(Field)`
  margin-bottom: 1em;
  padding: 0.5em;
  font-size: 1em;
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
  padding: 0.7em;
  font-size: 1em;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Link = styled.a`
  text-align: center;
  display: block;
  margin-top: 1em;
  color: #0070f3;
  cursor: pointer;
  text-decoration: none; 
`;

export default SignupForm