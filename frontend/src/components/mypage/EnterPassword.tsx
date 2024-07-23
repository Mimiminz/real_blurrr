import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Profile from './Profile';
import styled from 'styled-components';

interface EnterPasswordProps {
  onPasswordEntered: () => void;
}

const EnterPassword = ({ onPasswordEntered }: EnterPasswordProps): JSX.Element => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);

  if (isPasswordCorrect) {
    return <Profile />;
  }

  return (
    <Container>
      <h2>비밀번호를 입력해주세요.</h2>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required('비밀번호를 입력해주세요.')
            .oneOf(['123'], '비밀번호가 올바르지 않습니다.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setIsPasswordCorrect(true);
          setSubmitting(false);
          onPasswordEntered();
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <Field 
              type="password" 
              name="password" 
              placeholder="비밀번호" 
            />
            <ErrorMessage name="password" component="div" className="error" />
            <Button type="submit" disabled={isSubmitting}>
              확인
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default EnterPassword;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
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

const Button = styled.button`
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
