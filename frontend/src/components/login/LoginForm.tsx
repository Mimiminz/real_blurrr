import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { login as loginApi } from "@/api/auth";
import api from "../../api/index";
import { useLeagueStore } from "@/store/leagueStore";
import { fetchUserLeagueList } from "@/api/league";
import { LeagueList, UserLeague } from "@/types/leagueTypes";
import FindPasswordForm from "../findpassword/FindPasswordForm";
import SignupForm from "../signup/SignupForm";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  closeLoginModal: () => void;
}

const LoginForm = ({ closeLoginModal }: LoginFormProps) => {
  const router = useRouter();
  const [isFindPasswordModalOpen, setIsFindPasswordModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openFindPasswordModal = () => setIsFindPasswordModalOpen(true);
  const closeFindPasswordModal = () => setIsFindPasswordModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const { setAccessToken, setRefreshToken, setUser } = useAuthStore((state) => ({
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
    setUser: state.setUser,
  }));
  const { setInitialized, setUserLeagueList } = useLeagueStore();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setSubmitting(true);
      const response = await loginApi({
        email: values.email,
        password: values.password,
      });

      const { accessToken, refreshToken } = response;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("accessToken", accessToken);

      const userResponse = await api.get("/v1/members", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(userResponse.data);
      if (userResponse.data.isAuth) {
        const userLeagues: UserLeague[] = await fetchUserLeagueList();
        const userTabs: LeagueList[] = userLeagues.map((userLeague) => ({
          id: userLeague.league.id,
          name: userLeague.league.name,
          type: userLeague.league.type,
          peopleCount: userLeague.league.peopleCount,
        }));

        setUserLeagueList(userTabs);
      }

      closeLoginModal();
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        const errorMessage =
          errorResponse?.body?.detail || "로그인 요청 중 오류가 발생했습니다.";
        alert(errorMessage);
      } else {
        alert("로그인 요청 중 오류가 발생했습니다.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isFindPasswordModalOpen && (
        <FindPasswordForm closeFindPasswordModal={closeFindPasswordModal} />
      )}
      {isSignupModalOpen && (
        <SignupForm closeSignupModal={closeSignupModal} />
      )}
      {!isFindPasswordModalOpen && !isSignupModalOpen && (
        <Container>
          <Image src="/images/logo/logo.png" alt="로고" />
          <SubTitle>blurrr의 다양한 서비스를 이용해 보세요!</SubTitle>
          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("유효한 이메일 형식을 입력하세요.")
                .required("이메일은 필수 입력 항목입니다."),
              password: Yup.string()
              .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/,
                "비밀번호는 영문자, 숫자, 특수 기호를 조합하여 8자 이상 16자 이하로 입력해야 합니다."
              )
              .required("비밀번호는 필수 입력 항목입니다."),
              rememberMe: Yup.boolean(),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <StyledForm>
                <StyledField name="email" type="email" placeholder="이메일" />
                <StyledErrorMessage name="email" component="div" />
                <StyledField
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                />
                <StyledErrorMessage name="password" component="div" />
                <Button type="submit" disabled={isSubmitting}>
                  로그인
                </Button>

                <Link href="#" onClick={openFindPasswordModal}>
                  비밀번호를 잊으셨나요?
                </Link>
                <Link href="#" onClick={openSignupModal}>
                  회원가입
                </Link>
              </StyledForm>
            )}
          </Formik>
        </Container>
      )}
    </>
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

const SubTitle = styled.h4`
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    margin-bottom: 40px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledField = styled(Field)`
  padding: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  border-radius: 5px;
  border: 1.5px solid #eeeeee;
  
  @media (min-width: 768px) {
    font-size: 16px;
    padding: 15px;
    margin-bottom: 20px;
  }

  @media (min-width: 1024px) {
    padding: 20px;
    margin-bottom: 25px;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  min-height: 20px; 
  
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  color: #fff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #ff5e01;
  }

  @media (min-width: 768px) {
    padding: 15px;
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    padding: 20px;
    font-size: 18px;
  }
`;

const Link = styled.a`
  text-align: center;
  display: block;
  margin-top: 10px;
  color: #000;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
    margin-top: 15px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
    margin-top: 20px;
  }
`;

const Image = styled.img`
  width: 60px;
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 80px;
    margin-bottom: 30px;
  }

  @media (min-width: 1024px) {
    width: 100px;
    margin-bottom: 40px;
  }
`;

export default LoginForm;
