import React, { useState, ChangeEvent, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import api, {
  requestEmailVerificationCode,
  verifyEmailCode,
} from "../../api/index";
import { debounce } from "../../utils/debounce";
import { checkNicknameAvailability } from "../../api/index";
import { useRouter } from "next/navigation";
import { signup } from "@/api/signup";
import { SignupFormValues } from "@/types/authTypes";

const initialValues: SignupFormValues = {
  email: "",
  emailVerification: "",
  nickname: "",
  password: "",
  passwordCheck: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "유효한 이메일 형식을 입력하세요."
    )
    .required("이메일은 필수 입력 항목입니다."),
  emailVerification: Yup.string().required("인증번호는 필수 입력 항목입니다."),
  nickname: Yup.string()
    .matches(
      /^[a-zA-Z가-힣]{2,8}$/,
      "2자 이상 8자 이하, 특수 문자 및 한글 초성, 모음 포함 불가"
    )
    .required("닉네임은 필수 입력 항목입니다."),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/,
      "영문, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하"
    )
    .required("비밀번호는 필수 입력 항목입니다."),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password"), ""], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수 입력 항목입니다."),
});

const SignupForm = ({ closeSignupModal }: { closeSignupModal: () => void }) => {
  const router = useRouter();
  const [checkList, setCheckList] = useState<string[]>([]);
  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [emailVerificationError, setEmailVerificationError] =
    useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const debouncedVerifyEmailCode = debounce(
    async (email: string, code: string) => {
      if (code) {
        try {
          const response = await verifyEmailCode(email, code, "signup");
          if (response === true) {
            setEmailVerified(true);
            setEmailVerificationError("인증번호가 확인되었습니다.");
            setIsTimerActive(false);
          } else {
            setEmailVerified(false);
            setEmailVerificationError("인증번호가 일치하지 않습니다.");
          }
        } catch (error) {
          setEmailVerified(false);
          setEmailVerificationError("인증번호 확인 중 오류가 발생했습니다.");
        }
      } else {
        setEmailVerified(false);
        setEmailVerificationError("");
      }
    },
    500
  );

  const debouncedCheckNickname = debounce(async (nickname: string) => {
    if (nickname) {
      try {
        const isAvailable = await checkNicknameAvailability(nickname);
        setIsNicknameAvailable(isAvailable);
        setNicknameError(isAvailable ? "" : "중복된 닉네임이 존재합니다.");
      } catch (error) {
        setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
      }
    } else {
      setIsNicknameAvailable(null);
      setNicknameError("");
    }
  }, 500);

  const handleSendVerification = async (email: string) => {
    try {
      await requestEmailVerificationCode(email, "signup");
      alert("인증번호가 전송되었습니다.");
      setTimer(300);
      setIsTimerActive(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.body?.detail ||
        "인증번호 전송 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  const checkAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckList(["age", "terms", "collect"]);
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

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: FormikHelpers<SignupFormValues>
  ) => {
    try {
      const response = await signup(
        values.email,
        values.nickname,
        values.password,
        values.passwordCheck
      );

      if (response) {
        alert("회원가입이 완료되었습니다.");
        closeSignupModal();
        router.push("/");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.body?.detail ||
        "회원가입 중 오류가 발생했습니다.";
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
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Container>
      <Div>
        <Image src="/images/logo/logo.png" alt="로고" />
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
                  className={
                    touched.email ? (errors.email ? "error" : "valid") : ""
                  }
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
                  className={
                    touched.emailVerification
                      ? errors.emailVerification
                        ? "error"
                        : emailVerified
                        ? "valid"
                        : ""
                      : ""
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setFieldValue("emailVerification", value);
                    debouncedVerifyEmailCode(values.email, value);
                  }}
                />
                {isTimerActive && (
                  <TimerDisplay>{formatTime(timer)}</TimerDisplay>
                )}
              </InputContainer>
              <StyledErrorMessage name="emailVerification" component="div" />

              {touched.emailVerification && !errors.emailVerification && (
                <FailMessage>{emailVerificationError}</FailMessage>
              )}

              <StyledField
                name="nickname"
                type="text"
                placeholder="닉네임 입력"
                className={
                  touched.nickname
                    ? errors.nickname
                      ? "error"
                      : isNicknameAvailable
                      ? "valid"
                      : ""
                    : ""
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setFieldValue("nickname", value);
                  debouncedCheckNickname(value);
                }}
              />
              <StyledErrorMessage name="nickname" component="div" />
              {touched.nickname && !errors.nickname && (
                <SuccessMessage>
                  {isNicknameAvailable === true
                    ? "사용 가능한 닉네임입니다."
                    : nicknameError}
                </SuccessMessage>
              )}

              <StyledField
                name="password"
                type="password"
                placeholder="비밀번호"
                className={
                  touched.password ? (errors.password ? "error" : "valid") : ""
                }
              />
              <StyledErrorMessage name="password" component="div" />

              <StyledField
                name="passwordCheck"
                type="password"
                placeholder="비밀번호 확인"
                className={
                  touched.passwordCheck
                    ? errors.passwordCheck
                      ? "error"
                      : "valid"
                    : ""
                }
              />
              <StyledErrorMessage name="passwordCheck" component="div" />

              <CheckContainer>
                <Checkbox
                  type="checkbox"
                  id="all-check"
                  checked={checkList.length === 3}
                  onChange={checkAll}
                />
                <Label htmlFor="all-check">전체 동의</Label>
              </CheckContainer>

              <CheckContainer>
                <Checkbox
                  type="checkbox"
                  id="age-check"
                  name="age"
                  checked={checkList.includes("age")}
                  onChange={check}
                />
                <Label htmlFor="age-check">(필수) 만 14세 이상입니다.</Label>
              </CheckContainer>

              <CheckContainer>
                <Checkbox
                  type="checkbox"
                  id="terms-check"
                  name="terms"
                  checked={checkList.includes("terms")}
                  onChange={check}
                />
                <Label htmlFor="terms-check">
                  (필수) 이용약관 및 개인정보수집 및 이용에 동의합니다.
                </Label>
              </CheckContainer>
              {/* 
              <CheckContainer>
                <Checkbox
                  type="checkbox"
                  id="collect-check"
                  name="collect"
                  checked={checkList.includes('collect')}
                  onChange={check}
                />
                <Label htmlFor="collect-check">(필수) 마케팅 정보 수집에 동의합니다.</Label>
              </CheckContainer> */}

              <Button
                type="submit"
                className={buttonColor ? "active" : ""}
                disabled={!buttonColor}
              >
                가입하기
              </Button>
            </StyledForm>
          )}
        </Formik>
      </Div>
    </Container>
  );
};

export default SignupForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 100%;
  padding: 10px;
  position: relative;
  overflow: hidden;
  @media (min-width: 480px) {
    padding: 20px;
  }

  @media (min-width: 768px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    padding: 50px;
  }

  @media (min-width: 1440px) {
    padding: 60px;
  }
`;

const Image = styled.img`
  width: 120px;

  @media (min-width: 480px) {
    width: 120px;
  }

  @media (min-width: 768px) {
    width: 100px;
  }

  @media (min-width: 1024px) {
    width: 120px;
  }

  @media (min-width: 1440px) {
    width: 120px;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const SubTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 20px;
  color: #666666;

  @media (min-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledField = styled(Field)`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #dddddd;

  &.error {
    border-color: red;
  }

  &.valid {
    border-color: green;
  }

  @media (min-width: 480px) {
    padding: 10px;
  }

  @media (min-width: 768px) {
    padding: 10px;
  }

  @media (min-width: 1024px) {
    padding: 10px;
  }

  @media (min-width: 1440px) {
    padding: 10px;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 12px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const FailMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  background-color: #f9803a;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #ff5e01;
  }

  @media (min-width: 480px) {
    padding: 10px;
  }

  @media (min-width: 768px) {
    padding: 10px;
  }

  @media (min-width: 1024px) {
    padding: 10px;
  }

  @media (min-width: 1440px) {
    padding: 10px;
  }
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const TimerDisplay = styled.div`
  font-size: 12px;
  color: #000000;
  font-weight: 400;
  position: absolute;
  right: 10%;
  top: 40%;
  transform: translateY(-50%);

  @media (min-width: 480px) {
    font-size: 12px;
    right: 10%;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    right: 10%;
  }

  @media (min-width: 1024px) {
    font-size: 14px;
  }

  @media (min-width: 1440px) {
    font-size: 14px;
  }
`;
