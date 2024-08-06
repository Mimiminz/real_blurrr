import StyledComponentsWrapper from "@/components/common/UI/StyledComponentsWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blurrr",
  description: "...",
  icons: {
    icon: "/images/logo/logo.png",
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
        <StyledComponentsWrapper>{children}</StyledComponentsWrapper>
      </body>
    </html>
  );
}
