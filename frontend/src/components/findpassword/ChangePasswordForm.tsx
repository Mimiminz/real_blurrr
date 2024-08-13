import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { changePassword } from '@/api/auth';

interface ChangePasswordFormValues {
  password: string;
  passwordCheck: string;
}

interface ChangePasswordFormProps {
  email: string;
  closeFindPasswordModal: () => void;
}

const initialValues: ChangePasswordFormValues = {
  password: '',
  passwordCheck: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,16}$/, '비밀번호는 영문, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하로 입력해야 합니다.')
    .required('비밀번호는 필수 입력 항목입니다.'),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 항목입니다.'),
});

const ChangePasswordForm = ({ email, closeFindPasswordModal }: ChangePasswordFormProps) => {
  const handleSubmit = async (values: ChangePasswordFormValues, actions: FormikHelpers<ChangePasswordFormValues>) => {
    const payload = {
      email,
      password: values.password,
      passwordCheck: values.passwordCheck,
    };

    try {
      await changePassword(payload);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      closeFindPasswordModal();
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Container>
      <Image src="/images/logo/logo.png" alt="로고" />
      <Title>비밀번호 변경</Title>
      <SubTitle>비밀번호를 재설정해주세요.</SubTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <StyledForm>
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

            <Button
              type="submit"
              disabled={errors.password || errors.passwordCheck ? true : false}
            >
              확인
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 400px;
  padding: 20px;

  @media (min-width: 480px) {
    padding: 10px;
  }

  @media (min-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1024px) {
    padding: 30px;
  }

  @media (min-width: 1440px) {
    padding: 40px;
  }
`;

const Image = styled.img`
  width: 60px;
  height: auto;

  @media (min-width: 768px) {
    width: 80px;
  }
  @media (min-width: 1024px) {
    width: 100px;
  }
`;


const Title = styled.h2`
  text-align: center;
  margin-bottom: 0.5em;
  font-size: 1.90em;
  color: #666;

  @media (min-width: 768px) {
    font-size: 1.75em;
  }

  @media (min-width: 1024px) {
    font-size: 1.75em;
  }
`;

const SubTitle = styled.h4`
  text-align: center;
  margin-bottom: 1.5em;
  font-size: 1em;
  color: #666;

  @media (min-width: 768px) {
    font-size: 1.2em;
  }

  @media (min-width: 1024px) {
    font-size: 1.2em;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledField = styled(Field)`
  padding: 0.7em;
  font-size: 1em;
  border: 2px solid;
  border-radius: 5px;
  margin-bottom: 1em;
  border-color: #ccc;
  transition: border-color 0.3s, color 0.3s;

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
  font-size: 0.875em;

  @media (min-width: 768px) {
    font-size: 1em;
  }
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
  padding: 0.7em;
  font-size: 0.7em;
  color: #ffffff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  cursor: pointer;


  &:hover {
    background-color: #ff5e01;
    padding: 0.7em;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  @media (min-width: 480px) {
    font-size: 0.85em;
  }

  @media (min-width: 768px) {
    font-size: 0.85em;
  }

  @media (min-width: 1024px) {
    font-size: 0.85em;
  }

  @media (min-width: 1440px) {
    font-size: 0.85em;
  }

`;

export default ChangePasswordForm;
