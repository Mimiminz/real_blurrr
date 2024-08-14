import React, { useState, useRef, KeyboardEvent, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Mentioned } from "@/types/channelType";
import { fetchTags } from "@/api/channel";

interface TagsInputProps {
   tags: string[];
   setTags: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
   const suggestionsRef = useRef<HTMLDivElement>(null);
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

   const handleTagInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);

      if (e.target.value.trim()) {
         try {
            const suggestions = await fetchTags(e.target.value.trim());
            setTagSuggestions(suggestions || []);
            setShowSuggestions(true);
         } catch (error) {
            console.error("Error fetching tag suggestions:", error);
            setTagSuggestions([]);
         }
      } else {
         setTagSuggestions([]);
         setShowSuggestions(false);
      }
   }, []);

   const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault();
         const trimmedTagInput = tagInput.trim();

         if (highlightedIndex >= 0 && tagSuggestions.length > 0) {
            const selectedTag = tagSuggestions[highlightedIndex];
            if (tags.length < 3 && !tags.some(tag => tag === selectedTag.name)) {
               setTags([...tags, selectedTag.name]);
               setTagInput("");
               setShowSuggestions(false);
            }
         } else if (trimmedTagInput && tags.length < 3) {
            const isTagValid = tagSuggestions.some(suggestion => suggestion.name === trimmedTagInput);

            if (isTagValid) {
               if (!tags.some(tag => tag === trimmedTagInput)) {
                  setTags([...tags, trimmedTagInput]);
                  setTagInput("");
               }
            } else {
               alert("존재하지 않는 태그입니다.");
            }
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

   const handleTagRemove = useCallback((tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
   }, [tags]);

   const handleTagClick = useCallback((suggestion: Mentioned) => {
      if (tags.length < 3 && !tags.some(tag => tag === suggestion.name)) {
         setTags([...tags, suggestion.name]);
         setTagInput("");
         setShowSuggestions(false);
      }
   }, [tags]);

   return (
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
               <Tag key={tag}>
                  {tag}
                  <RemoveTagButton onClick={() => handleTagRemove(tag)}>x</RemoveTagButton>
               </Tag>
            ))}
         </TagsContainer>
      </TagInputContainer>
   );
};

export default TagsInput;

const TagInputContainer = styled.div`
  width: 100%;
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
  top: 40px;
  text-align: left;
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;
