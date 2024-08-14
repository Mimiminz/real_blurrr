// src/pages/WritePage.tsx

"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import QuillEditor from "@/components/channel/board/QuillEditor";
import { fetchPostWrite, fetchBoastWrite } from "@/api/channel";
import FindTags from "@/components/channel/board/FindTags";
import * as S from '@/styles/channel/board/writePage.styled'; // 스타일드 컴포넌트 불러오기

export default function WritePage() {
  const boastId = process.env.NEXT_PUBLIC_BOAST_ID;
  const { channelId } = useParams<{ channelId: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbNail, setThumbNail] = useState<string>("");

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (newTitle.length > 35) {
      setTitleError("제목은 35자 이내로 작성해주세요.");
    } else {
      setTitleError(""); // 35자 이내면 오류 메시지 제거
    }

    setTitle(newTitle);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    if (boastId === channelId && !thumbNail) {
      setContentError("차 자랑은 썸네일로 등록할 사진이 필요합니다.");
      hasError = true;
    } else {
      setContentError("");
    }

    if (hasError) return;

    try {
      if (boastId === channelId) {
        await fetchBoastWrite(title, content, thumbNail, tags);
        router.push(`/channels/boast`);
      } else {
        await fetchPostWrite(channelId, title, content, tags);
        router.push(`/channels/${channelId}`);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <S.Container>
      <S.PageTitle>게시글 작성</S.PageTitle>
      <form onSubmit={handleSubmit}>
        <S.Input
          name="titleInput"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
          $isError={!!titleError}
        />
        {titleError && <S.ErrorMessage>{titleError}</S.ErrorMessage>}
        <FindTags tags={tags} setTags={setTags} />
        <S.EditorAndButtonContainer>
          <S.EditorContainer $isError={!!contentError}>
            <QuillEditor content={content} setContent={setContent} setThumbNail={setThumbNail} />
          </S.EditorContainer>
          {contentError && <S.ErrorMessage>{contentError}</S.ErrorMessage>}
          <S.SubmitButton type="submit">작성</S.SubmitButton>
        </S.EditorAndButtonContainer>
      </form>
    </S.Container>
  );
};
