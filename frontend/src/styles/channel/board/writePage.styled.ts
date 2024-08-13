// src/styles/WritePage.styles.ts

import styled from "styled-components";

export const Container = styled.div`
  padding: 50px 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 750px;
  }

  @media (min-width: 1024px) {
    max-width: 1000px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 1000px;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const EditorAndButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EditorContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 750px;
  }

  @media (min-width: 1024px) {
    max-width: 1000px;
  }
`;

export const SubmitButton = styled.button`
  width: 100px;
  padding: 12px;
  background-color: #ffa600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;
  max-width: 300px;

  &:hover {
    background-color: #ff900d;
  }
`;
