import React, { useState, ChangeEvent } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

interface ChangePasswordFormValues {
  password: string;
  passwordCheck: string;
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

const ChangePasswordForm = () => {
  const buttonColor = useState<boolean>(false);

  const handleSubmit = (values: ChangePasswordFormValues, { setSubmitting }: FormikHelpers<ChangePasswordFormValues>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Container>
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
              disabled={!buttonColor}
              className={buttonColor ? 'text-green-500' : 'text-slate-200'}
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

export default ChangePasswordForm;
