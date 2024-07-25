"use client";

import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import StyledComponentsRegistry from "../lib/registry";
import Header from "@/components/common/layout/Header";
import Footer from "@/components/common/layout/Footer";
import GlobalStyle from "../styles/GlobalStyle";
import { theme } from "../styles/theme";

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
              <Main>{children}</Main>
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
  margin: 80px 220px;

  @media (max-width: 992px) {
    margin: 80px 20px;
  }
`;
