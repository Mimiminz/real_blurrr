"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from 'styled-components';
import QuillEditor from '@/components/channel/board/QuillEditor';
import { fetchPostWrite } from "@/api/channel";

export default function WritePage({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = params.channelId;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await fetchPostWrite(channelId, title, content);
      router.push(`/channels/${channelId}`);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Container>
      <PageTitle>게시글 작성</PageTitle>
      <Input
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleTitleChange}
      />
      <Input
        placeholder="태그를 선택해주세요. 최대 3개까지 가능합니다."
        value={tags}
        onChange={handleTagsChange}
      />
      <EditorAndButtonContainer>
        <EditorContainer>
          <QuillEditor content={content} setContent={setContent} />
        </EditorContainer>
        <SubmitButton onClick={handleSubmit}>작성</SubmitButton>
      </EditorAndButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 16px;
`;

const PageTitle = styled.h1`
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
  box-sizing: border-box;
`;

const EditorAndButtonContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 12px;
  background-color: #ffa600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;

  &:hover {
    background-color: #FF900D;
  }
`;
