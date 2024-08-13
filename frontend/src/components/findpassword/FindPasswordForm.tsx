import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { requestEmailVerificationCode, verifyEmailCode } from '../../api/index';
import ChangePasswordForm from './ChangePasswordForm';

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
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '유효한 이메일 형식을 입력하세요.')
    .required('이메일은 필수 입력 항목입니다.'),
  emailVerification: Yup.string().required('인증번호는 필수 입력 항목입니다.'),
});

const FindPasswordForm = ({ closeFindPasswordModal }: { closeFindPasswordModal: () => void }) => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const handleSendVerification = async (email: string) => {
    try {
      await requestEmailVerificationCode(email, 'password_change');
      alert('인증번호가 전송되었습니다.');
      setTimer(300);
      setIsTimerActive(true);
      setEmail(email); // Save email to state
    } catch (error: any) {
      const errorMessage = error.response?.data?.body?.detail || '인증번호 전송 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const handleVerifyEmailCode = async (email: string, code: string) => {
    try {
      const response = await verifyEmailCode(email, code, 'password_change');
      if (response === true) {
        setEmailVerified(true);
        setIsTimerActive(false);
      } else {
        setEmailVerified(false);
        alert('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setEmailVerified(false);
      alert('인증번호 확인 중 오류가 발생했습니다.');
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
      {!emailVerified ? (
        <>
          <Title>비밀번호 찾기</Title>
          <SubTitle>이메일을 인증해 주세요.</SubTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, touched, errors, isSubmitting }) => (
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

                <InputContainer>
                  <StyledField
                    name="emailVerification"
                    type="text"
                    placeholder="인증번호 입력"
                    className={touched.emailVerification ? (errors.emailVerification ? 'error' : 'valid') : ''}
                  />
                  <VerificationContainer>
                    <Button
                      type="button"
                      onClick={() => handleVerifyEmailCode(values.email, values.emailVerification)}
                    >
                      인증번호 확인
                    </Button>
                    {isTimerActive && (
                      <TimerDisplay>{formatTime(timer)}</TimerDisplay>
                    )}
                  </VerificationContainer>
                </InputContainer>
                <StyledErrorMessage name="emailVerification" component="div" />
                
                {/* {touched.emailVerification && !errors.emailVerification && (
                  <SuccessMessage>인증번호가 확인되었습니다.</SuccessMessage>
                )} */}

                <Button
                  type="submit"
                  disabled={!emailVerified || isSubmitting}
                  className={emailVerified ? 'text-green-500' : 'text-slate-200'}
                >
                  비밀번호 변경
                </Button>
              </StyledForm>
            )}
          </Formik>
        </>
      ) : (
        <ChangePasswordForm email={email} closeFindPasswordModal={closeFindPasswordModal} />
      )}
    </Container>
  );
};

export default FindPasswordForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1200px;
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
  width: 100%; 
  position: relative; 
`;

const StyledField = styled(Field)`
  flex: 1;
  padding: 0.7em;
  font-size: 1em;
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
  color: #000000;
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

const VerificationContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimerDisplay = styled.div`
  font-size: 14px;
  color: #ff0000;
  position: absolute;
  right: 110%;
  top: 48%;
  transform: translateY(-50%);

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;
