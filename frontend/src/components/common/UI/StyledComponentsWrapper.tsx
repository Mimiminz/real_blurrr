// src/components/StyledComponentsWrapper.tsx
"use client";

import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import Header from "@/components/common/layout/Header";
import Footer from "@/components/common/layout/Footer";
import PageTransition from "@/components/common/UI/PageTransition";

const StyledComponentsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Header />
          <ContentWrapper>
            <Main>{children}</Main>
          </ContentWrapper>
          <Footer />
        </Layout>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;
const Main = styled.main`
  flex: 1;
  justify-content: center;
  margin: 10px 20px;
  /* 핸드폰 설정 */
  @media (min-width: 480px) {
    margin: 20px 20px;
  }

  /* 태블릿 크기 이상 설정 */
  @media (min-width: 768px) {
    margin: 30px 60px;
  }

  /* 데스크탑 크기 이상 설정 */
  @media (min-width: 1024px) {
    margin: 50px 80px;
  }

  /* 큰 데스크탑 크기 이상 설정 */
  @media (min-width: 1440px) {
    margin: 80px 190px;
  }
`;

export default StyledComponentsWrapper;
