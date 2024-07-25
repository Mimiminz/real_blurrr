import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

const initialValues: SignupFormValues = {
  email: 'blurrr2024@naver.com',
  nickname: '',
  password: '',
  passwordCheck: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('이메일은 필수 입력 항목입니다.').required('Required'),
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

const Profile = (): JSX.Element => {
  const [profileImage, setProfileImage] = useState<string>('images/profile.jpg');

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
      <Title>프로필 정보</Title>
      <UserContainer>
        <ImageContainer>
          <UserImage src={profileImage} alt='User Profile Image' />
          <ImageUploadLabel htmlFor='imageUpload'>+</ImageUploadLabel>
          <ImageUploadInput 
            id='imageUpload' 
            type='file' 
            accept='image/*' 
            onChange={handleImageChange} 
          />
        </ImageContainer>
        <SubUserContainer>
          <UserCarName>테슬라 오너</UserCarName>
          <UserName>상현전 님</UserName>
        </SubUserContainer>
      </UserContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <InputContainer>
              <StyledField
                name="email"
                type="email"
                placeholder="이메일"
                className={touched.email ? (errors.email ? 'error' : 'valid') : ''}
                readOnly
              />
              <StyledErrorMessage name="email" component="div" />
            </InputContainer>

            <InputContainer>
              <StyledField
                name="nickname"
                type="text"
                placeholder="닉네임 입력"
                className={touched.nickname ? (errors.nickname ? 'error' : 'valid') : ''}
              />
              <StyledErrorMessage name="nickname" component="div" />
              {touched.nickname && !errors.nickname && (
                <SuccessMessage>사용 가능한 닉네임입니다.</SuccessMessage>
              )}
            </InputContainer>

            <InputContainer>
              <StyledField
                name="password"
                type="password"
                placeholder="비밀번호"
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
                <SuccessMessage>비밀번호가 일치합니다.</SuccessMessage>
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
  height: 600px;
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
  align-items: center;
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

export default Profile;
