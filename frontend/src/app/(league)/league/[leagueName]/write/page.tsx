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
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return; // 빈 댓글은 제출하지 않음

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
        />
        <EditorContainer>
          <QuillEditor content={content} setContent={setContent} />
        </EditorContainer>
        <SubmitButton onClick={handleSubmit}>작성</SubmitButton>
      </Container>
      {showNoCarPopup && <NoCarPopup closePopup={closeNoCarPopup} />}
      {showLoginPopup && (
        <PopupContainer onClick={closeLoginPopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={closeLoginPopup}>×</CloseIcon>
            <LoginForm />
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

const Input = styled.input`
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box; /* 추가 */
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  box-sizing: border-box; /* 추가 */
`;

const SubmitButton = styled.button`
  width: 10%;
  max-width: 800px;
  padding: 12px;
  background-color: #ffa600; /* 녹색 배경으로 변경 */
  color: white; /* 흰색 글씨 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff900d; /* hover 상태 */
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
