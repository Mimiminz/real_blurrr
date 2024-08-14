"use client";

import React, { useEffect } from "react";
import CarCertificationForm from "@/components/carcertification/CarCertificationForm";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const page = () => {
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 사용해주세요");
      router.back();
    } else if (user?.isAuth) {
      alert("차 인증은 한번만 가능합니다.");
      router.back();
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || user?.isAuth) {
    return <div></div>;
  }

  return (
    <Container>
      <CarCertificationForm />
    </Container>
  );
};

export default page;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
