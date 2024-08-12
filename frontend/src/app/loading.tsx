"use client"
import React from "react";
import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <FadeLoader color="#FF900D" />
      <LoadingText>잠시만 기다려주세요.</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.h3`
  margin-top: 16px;
  font-size: 18px;
  color: #686d76;
`;
