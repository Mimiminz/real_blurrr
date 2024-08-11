"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import QuillEditor from "@/components/channel/board/QuillEditor";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import { fetchBoardWrite, fetchUserLeagueList } from "@/api/league";
import { useLeagueStore } from "@/store/leagueStore";
import { useAuthStore } from "@/store/authStore";
import NoCarPopup from "@/components/league/NoCarPopup";
import LoginForm from "@/components/login/LoginForm";
import NoAuthority from "@/components/league/NoAuthority";

import { BoardDetail, LeagueList, UserLeague } from "@/types/leagueTypes";

export default function WritePage({
  params,
}: {
  params: { leagueName: string };
}) {
  const encodedLeagueName = params.leagueName;
  const leagueName = decodeURIComponent(encodedLeagueName);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userLeagueList, activeTab, setActiveTab } = useLeagueStore();
  const { isLoggedIn, user } = useAuthStore();
  const [showNoCarPopup, setShowNoCarPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showNoAuthority, setShowNoAuthority] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    const findUserAuthority = () => {
      if (isLoggedIn) {
        if (user?.isAuth) {
          const findActiveTab = userLeagueList.find(
            (t) => t.name === leagueName
          );

          if (findActiveTab) {
            setActiveTab(findActiveTab);
          } else {
            setShowNoAuthority(true);
          }
        } else {
          setShowNoCarPopup(true);
        }
      } else {
        setShowLoginPopup(true);
      }
    };

    if (!activeTab.id) {
      findUserAuthority();
    }
  }, [leagueName, isLoggedIn, user, activeTab, setActiveTab, userLeagueList]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (newTitle.length > 35) {
      setTitleError("제목은 35자 이내로 작성해주세요.");
    } else {
      setTitleError(""); // 35자 이내면 오류 메시지 제거
    }

    setTitle(newTitle);
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError("제목을 작성해주세요.");
      hasError = true;
    } else if (title.length > 35) {
      hasError = true; // 35자 제한 오류는 handleTitleChange에서 처리
    }

    if (!content.trim()) {
      setContentError("본문을 작성해주세요.");
      hasError = true;
    } else {
      setContentError(""); // 유효한 경우 오류 메시지 초기화
    }

    if (hasError) return; // 에러가 있으면 제출 중지

    try {
      const write = await fetchBoardWrite(
        activeTab.id,
        activeTab.type,
        title,
        content
      );
      router.push(`/league/${leagueName}/${write.id}`);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const closeNoCarPopup = () => {
    setShowNoCarPopup(false);
    setShowNoAuthority(false);
    router.back();
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    router.back();
  };

  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb
            channel="리그"
            subChannel={leagueName}
            channelUrl={`/league/${leagueName}`}
          />
        </BreadcrumbContainer>
        <Title>게시글 작성</Title>
        <Input
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
          isError={!!titleError}
        />
        {titleError && <ErrorMessage>{titleError}</ErrorMessage>}

        <EditorContainer isError={!!contentError}>
          <QuillEditor content={content} setContent={setContent} />
        </EditorContainer>
        {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
        <SubmitButton onClick={handleSubmit}>작성</SubmitButton>
      </Container>
      {showNoCarPopup && <NoCarPopup closePopup={closeNoCarPopup} />}
      {showLoginPopup && (
        <PopupContainer onClick={closeLoginPopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={closeLoginPopup}>×</CloseIcon>
            <LoginForm closeLoginModal={closeLoginPopup} />
          </PopupContent>
        </PopupContainer>
      )}
      {showNoAuthority && <NoAuthority closePopup={closeNoCarPopup} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 16px;
`;

const BreadcrumbContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid ${({ isError }) => (isError ? "red" : "#ddd")};
  border-radius: 5px;
  box-sizing: border-box; /* 추가 */
`;

const EditorContainer = styled.div<{ isError: boolean }>`
  width: 100%;
  max-width: 800px;
  margin-bottom: 8px; /* 오류 메시지 추가를 위해 여백 감소 */
  box-sizing: border-box; /* 추가 */
  border: 1px solid ${({ isError }) => (isError ? "red" : "#ddd")};
  border-radius: 5px;
  padding: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0 0 16px; /* 여백 추가 */
  text-align: left; /* 왼쪽 정렬 */
`;

const SubmitButton = styled.button`
  width: 10%;
  max-width: 800px;
  padding: 12px;
  background-color: #ffa600;
  color: white; /* 흰색 글씨 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff900d;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #bbb;
  &:hover {
    color: #333;
  }
`;
