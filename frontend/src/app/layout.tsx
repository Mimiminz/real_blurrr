"use client";

import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import StyledComponentsRegistry from "../lib/registry";
import Header from "@/components/common/layout/Header";
import Footer from "@/components/common/layout/Footer";
import GlobalStyle from "../styles/GlobalStyle";
import { theme } from "../styles/theme";
import PageTransition from "@/components/common/UI/PageTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
              <Header />
              <PageTransition>
                <Main>
                {children}
                </Main>
              </PageTransition>
              <Footer />
            </Layout>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  justify-content: center;
  margin: 80px 20px;

  /* 핸드폰 설정 */
  @media (min-width: 480px) {
    margin: 80px 20px;
  }

  /* 태블릿 크기 이상 설정 */
  @media (min-width: 768px) {
    margin: 80px 60px;
  }

  /* 데스크탑 크기 이상 설정 */
  @media (min-width: 1024px) {
    margin: 80px 80px;
  }

  /* 큰 데스크탑 크기 이상 설정 */
  @media (min-width: 1440px) {
    margin: 80px 190px;
  }
`;
