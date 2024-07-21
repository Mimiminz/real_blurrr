"use client"

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();


  return (
    <main>
      <HeaderContainer onClick={() => router.push("/login")}>main</HeaderContainer>
      <div>
        버튼
      </div>
    </main>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #e97d35;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
