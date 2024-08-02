"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import QuillEditor from "@/components/channel/board/QuillEditor";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import { fetchBoardWrite } from "@/api/league";
import { useLeagueStore } from "@/store/leagueStore";

export default function WritePage({
  params,
}: {
  params: { leagueId: string };
}) {
  const leagueId = params.leagueId;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userLeagueList, activeTabName } = useLeagueStore();

  useEffect(() => {
    const hasAccess = userLeagueList.some((league) => league.id === leagueId);
    if (!hasAccess) {
      alert("허용되지 않은 리그입니다.");
      router.back();
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return; // 빈 댓글은 제출하지 않음

    try {
      await fetchBoardWrite(leagueId, title, content);
      router.push(`/league/${leagueId}`);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Container>
      <BreadcrumbContainer>
        <Breadcrumb
          channel="리그"
          subChannel={activeTabName}
          channelUrl={`/league/${leagueId}`}
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

const FileInputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box; /* 추가 */
`;

const FileInput = styled.div`
  width: 100%; /* 추가 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 8px;
  box-sizing: border-box; /* 추가 */
`;

const SubmitButton = styled.button`
  width: 10%;
  max-width: 800px;
  padding: 12px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;
