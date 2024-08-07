import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';


interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

const initialValues: SignupFormValues = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('이메일은 필수 입력 항목입니다.'),
  nickname: Yup.string().required('닉네임은 필수 입력 항목입니다.'),
  password: Yup.string()
    .required('비밀번호는 필수 입력 항목입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,16}$/,
      '비밀번호는 영문, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하로 입력해야 합니다.'
    ),
  passwordCheck: Yup.string()
    .required('비밀번호 확인은 필수 입력 항목입니다.')
    .oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.'),
});

const handleSubmit = (values: SignupFormValues, { setSubmitting }: FormikHelpers<SignupFormValues>) => {
  console.log(values);
  setSubmitting(false);
};

const ChangePassword = (): JSX.Element => {
  const [profileImage, setProfileImage] = useState<string>('images/profile.jpg');
  const user = useAuthStore(state => state.user);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

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
                name="password"
                type="password"
                placeholder="현재 비밀번호"
                className={touched.password ? (errors.password ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="password" component="div" />
              {touched.password && !errors.password && (
                <SuccessMessage>올바른 비밀번호입니다.</SuccessMessage>
              )}
            </InputContainer>

        

            <InputContainer>
              <StyledField
                name="password"
                type="password"
                placeholder="새 비밀번호"
                className={touched.password ? (errors.password ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="password" component="div" />
              {touched.password && !errors.password && (
                <SuccessMessage>사용 가능한 비밀번호입니다.</SuccessMessage>
              )}
            </InputContainer>

            <InputContainer>
              <StyledField
                name="passwordCheck"
                type="password"
                placeholder="비밀번호 확인"
                className={touched.passwordCheck ? (errors.passwordCheck ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="passwordCheck" component="div" />
              {touched.passwordCheck && !errors.passwordCheck && (
                <SuccessMessage>새 비밀번호가 일치합니다.</SuccessMessage>
              )}
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
