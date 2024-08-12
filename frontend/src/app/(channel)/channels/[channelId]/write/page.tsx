"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import QuillEditor from "@/components/channel/board/QuillEditor";
import { fetchPostWrite, fetchBoastWrite } from "@/api/channel";
import FindTags from "@/components/channel/board/FindTags";

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
    <Container>
      <PageTitle>게시글 작성</PageTitle>
      <form onSubmit={handleSubmit}>
        <Input
          name="titleInput"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <FindTags tags={tags} setTags={setTags} />
        <EditorAndButtonContainer>
          <EditorContainer>
            <QuillEditor content={content} setContent={setContent} setThumbNail={setThumbNail} />
          </EditorContainer>
          <SubmitButton type="submit">작성</SubmitButton>
        </EditorAndButtonContainer>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  max-width: 1200px; /* Increased max-width */
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 1000px; /* Increased max-width */
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

const EditorAndButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 1000px; /* Increased max-width */
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
