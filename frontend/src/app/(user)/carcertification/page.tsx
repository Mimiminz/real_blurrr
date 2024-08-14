"use client";

import React from "react";
import CarCertificationForm from "@/components/carcertification/CarCertificationForm";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const page = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  if (!isLoggedIn) {
    alert("로그인 후 사용해주세요");
    router.back();
    return;
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
