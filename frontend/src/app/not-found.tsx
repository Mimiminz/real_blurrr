"use client";
import React from "react";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <Container>
      <Image src="/images/not_found.png" alt="Not Found" />
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;

const Image = styled.img`
  width: 60%;
  height: auto;
`;
