import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { requestEmailVerificationCode, verifyEmailCode } from '@/api';

interface FindPasswordFormValues {
  email: string;
  emailVerification: string;
}

const initialValues: FindPasswordFormValues = {
  email: '',
  emailVerification: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('유효한 이메일 형식을 입력하세요.')
    .required('이메일은 필수 입력 항목입니다.'),
  emailVerification: Yup.string()
    .required('인증번호는 필수 입력 항목입니다.'),
});

const FindPasswordForm = () => {
  const buttonColor = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [emailVerificationError, setEmailVerificationError] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const handleSendVerification = async (email: string) => {
    try {
      await requestEmailVerificationCode(email,'password_change');
      alert('인증번호가 전송되었습니다.');
      setTimer(300);
      setIsTimerActive(true);
    } catch (error) {
      alert('인증번호 전송 중 오류가 발생했습니다.');
    }
  };

  const handleVerifyEmailCode = async (email: string, code: string) => {
    try {
      const response = await verifyEmailCode(email, code,'password_change');
      if (response === true) {
        setEmailVerified(true);
        setEmailVerificationError('인증번호가 확인되었습니다.');
        setIsTimerActive(false);
      } else {
        setEmailVerified(false);
        setEmailVerificationError('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setEmailVerified(false);
      setEmailVerificationError('인증번호 확인 중 오류가 발생했습니다.');
    }
  };



  const handleSubmit = (values: FindPasswordFormValues, { setSubmitting }: FormikHelpers<FindPasswordFormValues>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Container>
      <Title>비밀번호 찾기</Title>
      <SubTitle>이메일을 인증해 주세요.</SubTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({ values, errors, touched }) => (
        <StyledForm>
          <InputContainer>
            <StyledField
              name="email"
              type="email"
              placeholder="이메일"
              className={touched.email ? (errors.email ? 'error' : 'valid') : ''}
            />
            <Button
              type="button"
              onClick={() => handleSendVerification(values.email)}
            >
              인증번호 전송
            </Button>              
          </InputContainer>
          <StyledErrorMessage name="email" component="div" />
          {emailValid === false && (
            <SuccessMessage>유효한 이메일 형식이 아닙니다.</SuccessMessage>
          )}
          {touched.email && !errors.email && emailValid && (
            <SuccessMessage>올바른 이메일 형식입니다.</SuccessMessage>
          )}

          <InputContainer>
              <StyledField
                name="emailVerification"
                type="text"
                placeholder="인증번호 입력"
                className={touched.emailVerification ? (errors.emailVerification ? 'error' : 'valid') : ''}
              />
              <Button
                type="button"
                onClick={() => handleVerifyEmailCode(values.email, values.emailVerification)}
              >
                인증번호 확인
              </Button>
            </InputContainer>
            <StyledErrorMessage name="emailVerification" component="div" />
            {touched.emailVerification && !errors.emailVerification && (
              <SuccessMessage>{emailVerificationError}</SuccessMessage>
            )}

          <Button
            type="submit"
            disabled={!buttonColor}
            className={buttonColor ? 'text-green-500' : 'text-slate-200'}
          >
            비밀번호 변경
          </Button>
        </StyledForm>
      )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2em;
  background: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 0.5em;
`;

const SubTitle = styled.h4`
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const StyledField = styled(Field)`
  flex: 1;
  padding: 1em;
  font-size: 1em;
  margin-bottom: 1em;
  border: 2px solid;
  border-radius: 5px;
  transition: border-color 0.3s, color 0.3s;
  border-color: #ccc;

  &.valid {
    border-color: #4caf50;
    color: #333;
  }

  &.error {
    border-color: #f44336;
    color: #f44336;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-bottom: 1em;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  margin-bottom: 1em;
  font-size: 1em;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 0.7em;
  margin-left: 0.5em;
  font-size: 0.7em;
  color: #fff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff5e01;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default FindPasswordForm;
