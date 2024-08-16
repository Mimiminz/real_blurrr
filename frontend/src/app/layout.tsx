import StyledComponentsWrapper from "@/components/common/UI/StyledComponentsWrapper";
import PageTransition from "@/components/common/UI/PageTransition";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blurrr",
  description: "자동차 익명 커뮤니티",
  icons: {
    icon: "/images/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsWrapper>
          {children}
        </StyledComponentsWrapper>
      </body>
    </html>
  );
}
