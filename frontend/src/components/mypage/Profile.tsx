import React, { ChangeEvent, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { debounce } from '../../utils/debounce';
import { checkNicknameAvailability } from '../../api/index';
import { getUserInfo, updateProfile, uploadImageToS3 } from '@/api/mypage';

interface FormValues {
  email: string;
  nickname: string;
  profileImage: File | null;
}

const validationSchema = Yup.object({
  nickname: Yup.string()
  .matches(/^[a-zA-Z가-힣]{2,8}$/, '닉네임은 2자 이상 8자 이하이어야 하며, 특수 문자 및 한글 초성, 모음이 포함될 수 없습니다.')
  .required('닉네임은 필수 입력 항목입니다.'),
});

const Profile = (): JSX.Element => {
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [nicknameError, setNicknameError] = useState<string>('');
  const { user, setUser } = useAuthStore(state => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [profileImage, setProfileImage] = useState<string>(user?.profileUrl || "");

  const initialValues: FormValues = {
    email: user ? user.email : '',
    nickname: user ? user.nickname : '',
    profileImage: null
  };
  
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      setFieldValue('profileImage', file);
      
    }
  };

  const debouncedCheckNickname = debounce(async (nickname: string) => {
    if (nickname) {
      try {
        const isAvailable = await checkNicknameAvailability(nickname);
        setIsNicknameAvailable(isAvailable);
        setNicknameError(isAvailable ? '' : '이미 사용 중인 닉네임입니다.');
      } catch (error) {
        setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      }
    } else {
      setIsNicknameAvailable(null);
      setNicknameError('');
    }
  }, 500);

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {

    setSubmitting(true);

    try {
      const imgChange = !!values.profileImage;
      let profileUrl = '';
  
      if (values.profileImage) {

        const response = await updateProfile(values.profileImage.name, values.nickname, imgChange);
        profileUrl = response.profileUrl;
        await uploadImageToS3(profileUrl, values.profileImage);
      } else {
        // 이미지 변경이 없는 경우
        const response = await updateProfile('', values.nickname, imgChange);
        profileUrl = user?.profileUrl || '';
      }

      // 사용자 정보 다시 불러오기
      const updatedUser = await getUserInfo();
  
      // Zustand 상태 업데이트
      setUser({
        ...updatedUser,
        nickname: values.nickname,
   
      });
      alert('프로필이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트에 실패하였습니다. 다시 시도해주세요.', error);
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <Title>프로필 정보</Title>
      <UserContainer>
        <ImageContainer>
          <UserImage src={profileImage} alt='User Profile Image' />
          <ImageUploadLabel htmlFor='imageUpload'>+</ImageUploadLabel>
        </ImageContainer>
        <SubUserContainer>
          <UserName>{user ? user.nickname : ""}</UserName>
          <UserCarName>{user?.carTitle || "뚜벅이"}</UserCarName>
        </SubUserContainer>
      </UserContainer>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <StyledForm>
            <InputContainer>
              <StyledField
                name="email"
                type="email"
                placeholder={user ? user.email : ""}
                className={touched.email ? (errors.email ? 'error' : 'valid') : ''}
                readOnly
              />
              <StyledErrorMessage name="email" component="div" />
            </InputContainer>
  
            <InputContainer>
              <StyledField
                name="nickname"
                type="text"
                placeholder={user ? user.nickname : ""}
                className={touched.nickname ? (errors.nickname ? 'error' : (isNicknameAvailable ? 'valid' : '')) : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setFieldValue('nickname', value);
                  debouncedCheckNickname(value);
                }}
              />
              <StyledErrorMessage name="nickname" component="div" />
              {nicknameError && <FailMessage>{nicknameError}</FailMessage>}
            </InputContainer>
  
            <InputContainer>
              <ImageUploadInput 
                id='imageUpload' 
                type='file' 
                accept='image/*' 
                onChange={(e) => handleImageChange(e, setFieldValue)} 
              />
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
  margin-top: 70px;
  margin-bottom: 30px;
  gap: 70px;
  border-radius: 15px;

  @media (min-width: 480px) {
    gap: 20px;
  }

  @media (min-width: 768px) {
    gap: 70px;
  }

  @media (min-width: 1024px) {
    gap: 70px;
  }

  @media (min-width: 1440px) {
    gap: 70px;
  }


`;

const SubUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  font-size: 15px;
  font-weight: bold;
  color: #969696;

`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 100%;
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
  font-size: 0.8em;
  height: 24px;
  margin-bottom: 0.5em;
`;

const FailMessage = styled.div`
  color: red;
  font-size: 0.8em;
  height: 24px;

`;

const Button = styled.button`
  width: 200px;
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

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default Profile;
