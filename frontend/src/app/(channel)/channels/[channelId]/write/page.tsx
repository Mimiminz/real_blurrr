"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from 'styled-components';
import QuillEditor from '@/components/channel/board/QuillEditor';
import { fetchPostWrite, fetchTags } from '@/api/channel';
import { Mentioned } from '@/types/channelType';

export default function WritePage() {
  const { channelId } = useParams<{ channelId: string }>();
  const router = useRouter();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Mentioned[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState<Mentioned[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);

    if (e.target.value.trim()) {
      try {
        const suggestions = await fetchTags(e.target.value.trim());
        setTagSuggestions(suggestions || []);
        setShowSuggestions(true);
        console.log("Tag suggestions:", suggestions);
      } catch (error) {
        console.error("Error fetching tag suggestions:", error);
        setTagSuggestions([]);
      }
    } else {
      setTagSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && tagSuggestions.length > 0) {
        const selectedTag = tagSuggestions[highlightedIndex];
        if (tags.length < 3 && !tags.some(tag => tag.name === selectedTag.name)) {
          setTags([...tags, selectedTag]);
          setTagInput("");
          setShowSuggestions(false);
        }
      } else if (tagInput.trim() && tags.length < 3 && !tags.some(tag => tag.name === tagInput.trim())) {
        setTags([...tags, { name: tagInput.trim() }]);
        setTagInput("");
        setShowSuggestions(false);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % tagSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + tagSuggestions.length - 1) % tagSuggestions.length);
    }
  };

  const handleTagRemove = (tagToRemove: Mentioned) => {
    setTags(tags.filter(tag => tag.name !== tagToRemove.name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await fetchPostWrite(channelId, title, content, tags);
      router.push(`/channels/${channelId}`);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleTagClick = (suggestion: Mentioned) => {
    if (tags.length < 3 && !tags.some(tag => tag.name === suggestion.name)) {
      setTags([...tags, suggestion]);
      setTagInput("");
      setShowSuggestions(false);
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
        <TagInputContainer ref={suggestionsRef}>
          <Input
            name="tagInput"
            placeholder="태그를 입력 후 엔터키를 눌러 추가하세요. 최대 3개까지 가능합니다."
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
          />
          {showSuggestions && tagSuggestions.length > 0 && (
            <SuggestionsContainer>
              {tagSuggestions.map((suggestion, index) => (
                <Suggestion
                  key={suggestion.name}
                  onMouseDown={() => handleTagClick(suggestion)}
                  highlighted={index === highlightedIndex ? 1 : 0}
                >
                  {suggestion.name}
                </Suggestion>
              ))}
            </SuggestionsContainer>
          )}
          <TagsContainer>
            {tags.map(tag => (
              <Tag key={tag.name}>
                {tag.name}
                <RemoveTagButton onClick={() => handleTagRemove(tag)}>x</RemoveTagButton>
              </Tag>
            ))}
          </TagsContainer>
        </TagInputContainer>
        <EditorAndButtonContainer>
          <EditorContainer>
            <QuillEditor content={content} setContent={setContent} />
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

const TagInputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  position: relative;
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  z-index: 1000;
  top: 40px; /* Adjust this value if needed */
`;

const Suggestion = styled.div<{ highlighted: number }>`
  padding: 10px;
  background-color: ${({ highlighted }) => (highlighted === 1 ? '#eee' : 'white')};
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 15px;
`;

const RemoveTagButton = styled.span`
  margin-left: 5px;
  cursor: pointer;
  color: #888;
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
