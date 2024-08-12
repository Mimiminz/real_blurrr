import React, { useState, ChangeEvent, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import api, { requestEmailVerificationCode, verifyEmailCode } from '../../api/index';
import { debounce } from '../../utils/debounce';
import { checkNicknameAvailability } from '../../api/index';
import { useRouter } from "next/navigation";
import { signup } from '@/api/signup';
import { SignupFormValues } from '@/types/authTypes';

const initialValues: SignupFormValues = {
  email: '',
  emailVerification: '',
  nickname: '',
  password: '',
  passwordCheck: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '유효한 이메일 형식을 입력하세요.'
    )
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
  const router = useRouter();
  const [checkList, setCheckList] = useState<string[]>([]);
  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<string>('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [emailVerificationError, setEmailVerificationError] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const debouncedCheckNickname = debounce(async (nickname: string) => {
    if (nickname) {
      try {
        const isAvailable = await checkNicknameAvailability(nickname);
        setIsNicknameAvailable(isAvailable);
        setNicknameError(isAvailable ? '' : '중복된 닉네임이 존재합니다.');
      } catch (error) {
        setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      }
    } else {
      setIsNicknameAvailable(null);
      setNicknameError('');
    }
  }, 500);

  const handleSendVerification = async (email: string) => {
    try {
      await requestEmailVerificationCode(email,'signup');
      alert('인증번호가 전송되었습니다.');
      setTimer(300);
      setIsTimerActive(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.body?.detail || '인증번호 전송 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const handleVerifyEmailCode = async (email: string, code: string) => {
    try {
      const response = await verifyEmailCode(email, code,'signup');
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
      const response = await signup(values.email, values.nickname, values.password, values.passwordCheck);

      if (response) {
        alert('회원가입이 완료되었습니다.');
        router.push("/");
      } else {
        alert('회원가입에 실패했습니다.');
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.body?.detail || '회원가입 중 오류가 발생했습니다.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isTimerActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId!);
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTimerActive, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Container>
      <Image
        src="/images/logo/logo.png"
        alt="로고"
      />
      <Div>
      <Title>회원가입</Title>
      <SubTitle>간편한 가입으로 다양한 서비스를 이용해 보세요!</SubTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
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

            {isTimerActive && (
              <TimerDisplay>{formatTime(timer)}</TimerDisplay>
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
            {nicknameError && <NicknameErrorMessage>{nicknameError}</NicknameErrorMessage>}

            <StyledField
              name="password"
              type="password"
              placeholder="비밀번호"
              className={touched.password ? (errors.password ? 'error' : 'valid') : ''}
            />
            <StyledErrorMessage name="password" component="div" />
            {/* {touched.password && !errors.password && (
              <SuccessMessage>사용 가능한 비밀번호입니다.</SuccessMessage>
            )} */}

            <StyledField
              name="passwordCheck"
              type="password"
              placeholder="비밀번호 확인"
              className={touched.passwordCheck ? (errors.passwordCheck ? 'error' : 'valid') : ''}
            />
            <StyledErrorMessage name="passwordCheck" component="div" />
            {/* {touched.passwordCheck && !errors.passwordCheck && (
              <SuccessMessage>비밀번호가 일치합니다.</SuccessMessage>
            )} */}
            
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

            <Button onClick={() => router.push("/")}
              type="submit"
              disabled={!buttonColor}
              className={buttonColor ? 'text-green-500' : 'text-slate-200'}
            >
              회원가입
        
            </Button>
          </StyledForm>
        )}
      </Formik>
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  gap:80px;

  @media (min-width: 480px) {
    gap: 40px;
  }

  @media (min-width: 768px) {
    gap: 80px;
  }

  @media (min-width: 1024px) {
    gap: 80px;
  }

  @media (min-width: 1440px) {
    gap: 100px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  text-align: center; 
`;

const Div = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
`;

const SubTitle = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
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
  border: 1.5px solid #EEEEEE;

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
  font-size: 0.8em;
`;

interface PasswordFeedbackProps {
  isValid: boolean;
}

const PasswordFeedback = styled.div<PasswordFeedbackProps>`
  color: ${({ isValid }) => (isValid ? '#4caf50' : '#f44336')};
  margin-bottom: 1em;
`;

const NicknameErrorMessage = styled.div`
  color: #f44336; 
  margin-bottom: 1em;
  font-size: 0.8em;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  margin-bottom: 1em;
  font-size: 0.8em;
`;

const Button = styled.button`
  padding: 0.7em;
  margin-left: 0.5em;
  font-size: 0%.8;
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

const TimerDisplay = styled.div`
  font-size: 1em;
  font-weight: bold;
  color: #d9534f;
  margin-bottom: 10px;
`;

const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: auto;

  @media (min-width: 480px) {
    width: 80px;
  }

  @media (min-width: 768px) {
    width: 80px;
  }

  @media (min-width: 1024px) {
    width: 80px;
  }

  @media (min-width: 1440px) {
    width: 100px;
  }
`;

export default SignupForm;
