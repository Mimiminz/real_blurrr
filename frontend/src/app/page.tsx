// src/app/page.tsx
import { Metadata } from "next";
import HomeClient from "@/components/main/HomeClient";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return <HomeClient />;
}
