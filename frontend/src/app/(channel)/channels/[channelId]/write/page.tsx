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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

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
        />
        <FindTags tags={tags} setTags={setTags} />
        <S.EditorAndButtonContainer>
          <S.EditorContainer>
            <QuillEditor content={content} setContent={setContent} setThumbNail={setThumbNail} />
          </S.EditorContainer>
          <S.SubmitButton type="submit">작성</S.SubmitButton>
        </S.EditorAndButtonContainer>
      </form>
    </S.Container>
  );
};
