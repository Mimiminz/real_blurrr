import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { requestEmailVerificationCode, verifyEmailCode } from '../../api/index';
import axios from 'axios';


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

const FindPasswordForm = ({ closeFindPasswordModal }: { closeFindPasswordModal: () => void }) => {
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [emailVerificationError, setEmailVerificationError] = useState<string | null>(null);
  const [buttonColor, setButtonColor] = useState<boolean>(false);

  const handleSendVerification = async (email: string) => {
    try {
      await requestEmailVerificationCode(email,'password_change');
      setEmailValid(true);
    } catch (error) {
      setEmailValid(false);
      alert("인증번호 전송에 실패했습니다.");
    }
  };

  const handleVerifyEmailCode = async (email: string, code: string, type: 'password_change' | 'signup') => {
    try {
      await verifyEmailCode(email, code, type);
      setEmailVerificationError("인증번호가 확인되었습니다.");
      setButtonColor(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle API errors
        const errorResponse = error.response?.data;
        setEmailVerificationError(errorResponse?.message || "인증번호가 유효하지 않습니다.");
      } else {
        // Handle non-API errors
        setEmailVerificationError("인증번호가 유효하지 않습니다.");
      }
      setButtonColor(false);
    }
  };
  

  const handleSubmit = (values: FindPasswordFormValues, { setSubmitting }: FormikHelpers<FindPasswordFormValues>) => {
    setSubmitting(true);
    setTimeout(() => {
      alert('비밀번호 재설정 요청이 완료되었습니다.');
      setSubmitting(false);
      closeFindPasswordModal();
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
        {({ values, touched, errors }) => (
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
                onClick={() => handleVerifyEmailCode(values.email, values.emailVerification,'password_change')}
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 800px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 0.5em;
`;

const SubTitle = styled.h4`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledField = styled(Field)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0.7em;
  font-size: 1em;
  margin-right: 0.5em;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  font-size: 0.7em;
  color: #fff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5em;


  &:hover {
    background-color: #ff5e01;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default FindPasswordForm;
