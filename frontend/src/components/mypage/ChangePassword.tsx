import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { ChangeMyPassword } from '../../api/mypage';

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

const initialValues: ChangePasswordFormValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordCheck: '',
};

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required('현재 비밀번호는 필수 입력 항목입니다.'),
  newPassword: Yup.string()
    .required('새 비밀번호는 필수 입력 항목입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,16}$/,
      '비밀번호는 영문, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하로 입력해야 합니다.'
    ),
  newPasswordCheck: Yup.string()
    .required('비밀번호 확인은 필수 입력 항목입니다.')
    .oneOf([Yup.ref('newPassword'), ''], '비밀번호가 일치하지 않습니다.'),
});

const handleSubmit = async (
  values: ChangePasswordFormValues, 
  { setSubmitting, setErrors }: FormikHelpers<ChangePasswordFormValues>
) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    try {
      const success = await ChangeMyPassword(
        values.oldPassword,
        values.newPassword,
        values.newPasswordCheck,
        accessToken
      );
      if (success) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      setErrors({ oldPassword: '비밀번호가 올바르지 않습니다.' });
    }
  } else {
    setErrors({ oldPassword: '사용자 정보가 없습니다.' });
  }
  setSubmitting(false);
};

const ChangePassword = (): JSX.Element => {
  return (
    <Container>
      <Title>비밀번호 변경</Title>
    
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <InputContainer>
              <StyledField
                name="oldPassword"
                type="password"
                placeholder="현재 비밀번호"
                className={touched.oldPassword ? (errors.oldPassword ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="oldPassword" component="div" />
            </InputContainer>

            <InputContainer>
              <StyledField
                name="newPassword"
                type="password"
                placeholder="새 비밀번호"
                className={touched.newPassword ? (errors.newPassword ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="newPassword" component="div" />
            </InputContainer>

            <InputContainer>
              <StyledField
                name="newPasswordCheck"
                type="password"
                placeholder="비밀번호 확인"
                className={touched.newPasswordCheck ? (errors.newPasswordCheck ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="newPasswordCheck" component="div" />
            </InputContainer>

            <Button type="submit">저장</Button>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 70px;
  border-radius: 15px;
`;

const SubUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: visible;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  top: 80px;
  right: 8px;
  padding: 0.3em 0.6em;
  font-size: 0.7em;
  color: #fff;
  background-color: #f85b00;
  border: none;
  border-radius: 50%;
  z-index: 1;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const UserCarName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width: 100%;

  .error {
    color: red;
    margin-top: 8px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  width: 300px;
`;

const StyledField = styled(Field)`
  padding: 0.7em;
  margin-bottom: 0.5em;
  width: 100%;
  max-width: 300px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;

  &.error {
    border-color: red;
  }

  &.valid {
    border-color: green;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 0.875em;
  height: 24px;
  margin-bottom: 0.5em;
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 0.875em;
  height: 24px;
  margin-bottom: 0.5em;
`;

const Button = styled.button`
  width: 200px;
  padding: 0.7em;
  margin-top: 0.5em;
  font-size: 1em;
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

export default ChangePassword;
