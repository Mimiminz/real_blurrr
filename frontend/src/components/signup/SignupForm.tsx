import React, { useState, ChangeEvent } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import api from '../../api/index';
import { SignupFormValues } from '@/types/authTypes';
import { debounce } from '../../utils/debounce';
import { checkNicknameAvailability } from '../../api/index';

const initialValues: SignupFormValues = {
  email: '',
  emailVerification: '',
  nickname: '',
  password: '',
  passwordCheck: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('유효한 이메일 형식을 입력하세요.')
    .required('이메일은 필수 입력 항목입니다.'),
  emailVerification: Yup.string()
    .required('인증번호는 필수 입력 항목입니다.'),
  nickname: Yup.string()
    .matches(/^[a-zA-Z가-힣]{2,8}$/, '닉네임은 2자 이상 8자 이하이어야 하며, 특수 문자 및 한글 초성, 모음이 포함될 수 없습니다.')
    .required('닉네임은 필수 입력 항목입니다.'),
  password: Yup.string()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,16}$/, '비밀번호는 영문, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하로 입력해야 합니다.')
    .required('비밀번호는 필수 입력 항목입니다.'),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 항목입니다.'),
});

const SignupForm = () => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<string>('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);

  const debouncedCheckNickname = debounce(async (nickname: string) => {
    if (nickname) {
      try {
        const isAvailable = await checkNicknameAvailability(nickname);
        setIsNicknameAvailable(isAvailable);
        setNicknameError(isAvailable ? '가능' : '이미 사용 중인 닉네임입니다.');
      } catch (error) {
        setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      }
    } else {
      setIsNicknameAvailable(null);
      setNicknameError('');
    }
  }, 500);


  const checkAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckList(['age', 'terms', 'collect']);
    } else {
      setCheckList([]);
    }
    setButtonColor(event.target.checked);
  };

  const check = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedList = event.target.checked
      ? [...checkList, event.target.name]
      : checkList.filter((choice) => choice !== event.target.name);
    setCheckList(updatedList);
    setButtonColor(updatedList.length === 3); 
  };

  const handleSubmit = async (values: SignupFormValues, { setSubmitting }: FormikHelpers<SignupFormValues>) => {
    try {
      const response = await api.post('/v1/auth/signup', {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
        passwordCheck: values.passwordCheck,
      });

      if (response.data === true) {
        alert('회원가입이 완료되었습니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }

      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다.', error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <SubTitle>blurrr의 다양한 서비스를 이용해 보세요!</SubTitle>
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
                placeholder="이메일"
                className={touched.email ? (errors.email ? 'error' : 'valid') : ''}
              />
              <Button type="button">인증번호 전송</Button>
            </InputContainer>
            <StyledErrorMessage name="email" component="div" />
            {touched.email && !errors.email && (
              <SuccessMessage>인증이 완료되었습니다. 사용 가능한 이메일입니다.</SuccessMessage>
            )}

            <InputContainer>
              <StyledField
                name="emailVerification"
                type="text"
                placeholder="인증번호 입력"
                className={touched.emailVerification ? (errors.emailVerification ? 'error' : 'valid') : ''}
              />
              <Button type="button">인증번호 확인</Button>
            </InputContainer>
            <StyledErrorMessage name="emailVerification" component="div" />
            {touched.emailVerification && !errors.emailVerification && (
              <SuccessMessage>인증번호가 확인되었습니다.</SuccessMessage>
            )}

            <StyledField
              name="nickname"
              type="text"
              placeholder="닉네임 입력"
              className={touched.nickname ? (errors.nickname ? 'error' : (isNicknameAvailable ? 'valid' : '')) : ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setFieldValue('nickname', value);
                debouncedCheckNickname(value);
              }}
            />
  
            <StyledErrorMessage name="nickname" component="div" />
            {nicknameError && <SuccessMessage>{nicknameError}</SuccessMessage>}

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
            
            {/* 약관 동의 부분 */}
            <TermsContainer>
              <div>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    name="all"
                    onChange={checkAll}
                    checked={checkList.length === 3}
                  />
                  <div>이용약관 전체동의</div>
                </CheckboxContainer>
                <Separator />

                <CheckboxContainer>
                  <input
                    type="checkbox"
                    name="age"
                    onChange={check}
                    checked={checkList.includes('age')}
                  />
                  <div>
                    <span>(필수)</span> 만 19세 이상입니다
                  </div>
                </CheckboxContainer>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    name="terms"
                    onChange={check}
                    checked={checkList.includes('terms')}
                  />
                  <div>
                    <span>(필수)</span> 서비스 이용약관 동의
                  </div>
                </CheckboxContainer>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    name="collect"
                    onChange={check}
                    checked={checkList.includes('collect')}
                  />
                  <div>
                    <span>(필수)</span> 개인정보처리방침 동의
                  </div>
                </CheckboxContainer>
              </div>
            </TermsContainer>

            <Button
              type="submit"
              disabled={!buttonColor}
              className={buttonColor ? 'text-green-500' : 'text-slate-200'}
            >
              회원가입
            </Button>
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

`;

const StyledField = styled(Field)`
  display: flex;
  flex: 1;
  padding: 0.5em;
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

interface PasswordFeedbackProps {
  isValid: boolean;
}

const PasswordFeedback = styled.div<PasswordFeedbackProps>`
  color: ${({ isValid }) => (isValid ? '#4caf50' : '#f44336')};
  margin-bottom: 1em;
`;



const SuccessMessage = styled.div`
  color: #4caf50;
  margin-bottom: 1em;
  font-size: 0.8em;
`;

const Button = styled.button`
  padding: 0.7em;
  margin-left: 0.5em;
  font-size: 1em;
  color: #fff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  margin-bottom: 1em;
  cursor: pointer;

  &:hover {
    background-color: #ff5e01;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const TermsContainer = styled.div`
  margin-bottom: 1em;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;

  input {
    margin-right: 0.5em;
  }
`;

const Separator = styled.hr`
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 1em 0;
`;

export default SignupForm;
