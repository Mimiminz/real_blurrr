// src/app/layout.tsx
"use client";

import { ThemeProvider } from "styled-components";
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
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
