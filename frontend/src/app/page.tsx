// "use client";

// import Image from "next/image";
// import styled from "styled-components";
// import { useRouter } from "next/navigation";
// import HotArticleList from "@/components/main/HotArticleList";
// import BlackboxList from "@/components/main/BlackboxList";
// import CarPictureList from "@/components/main/CarPictureList";

// export default function Home() {
//   return (
//     <div>
//       <PageContainer>
//         <GridContainer>
//           <Main>
//             <ArticleSection>
//               <SectionTitle>Hot</SectionTitle>
//               <HotArticleList />
//             </ArticleSection>
//             <ArticleSection>
//               <SectionTitle>브랜드 리그</SectionTitle>
//             </ArticleSection>
//             <ArticleSection>
//               <SectionTitle>블랙박스</SectionTitle>
//               <BlackboxList />
//             </ArticleSection>
//             <ArticleSection>
//               <SectionTitle>차 자랑</SectionTitle>
//               <CarPictureList />
//             </ArticleSection>
//           </Main>
//           <Aside>
//             <h2>Today Car</h2>
//           </Aside>
//         </GridContainer>
//       </PageContainer>
//     </div>
//   );
// }

// const PageContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 0 300px;

//   @media (max-width: 992px) {
//     margin: 0 20px;
//   }
// `;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(12, 1fr);
//   gap: 30px;
//   width: 100%;

//   @media (max-width: 992px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Main = styled.main`
//   grid-column: span 8;
//   padding: 10px;

//   @media (max-width: 992px) {
//     grid-column: span 12;
//   }
// `;

// const Aside = styled.aside`
//   grid-column: span 4;

//   @media (max-width: 992px) {
//     display: none;
//   }
// `;

// const SectionTitle = styled.h2`
//   margin-bottom: 0;
// `;

// const ArticleSection = styled.div`
//   margin: 20px;
// `;

"use client";

import styled from "styled-components";
import HotArticleList from "@/components/main/HotArticleList";
import BlackboxList from "@/components/main/BlackboxList";
import CarPictureList from "@/components/main/CarPictureList";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <PageContainer>
        <GridContainer>
          <Main>
            <ArticleSection>
              <SectionTitle>Hot</SectionTitle>
              <HotArticleList />
            </ArticleSection>
            <ArticleSection>
              <SectionTitle>브랜드 리그</SectionTitle>
            </ArticleSection>
            <ArticleSection>
              <SectionTitle>블랙박스</SectionTitle>
              <BlackboxList />
            </ArticleSection>
            <ArticleSection>
              <SectionTitle>차 자랑</SectionTitle>
              <CarPictureList />
            </ArticleSection>
          </Main>
          <Aside>
            <h2>Today Car</h2>
          </Aside>
        </GridContainer>
      </PageContainer>
    </NextUIProvider>
  );
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 300px;

  @media (max-width: 992px) {
    margin: 0 20px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 30px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  grid-column: span 8;
  padding: 10px;

  @media (max-width: 992px) {
    grid-column: span 12;
  }
`;

const Aside = styled.aside`
  grid-column: span 4;

  @media (max-width: 992px) {
    display: none;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 0;
`;

const ArticleSection = styled.div`
  margin: 20px;
`;
