import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    onSearch(keyword);
  };

  const clearInput = () => {
    setKeyword("");
  };

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit}>
        <SearchContainer>
          <SearchIcon>
            <HiOutlineSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={handleChange}
          />
          {keyword && (
            <ClearIcon onClick={clearInput}>
              <IoClose />
            </ClearIcon>
          )}
        </SearchContainer>
        <SearchButton type="submit">검색</SearchButton>
      </SearchForm>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 5px 10px;
  max-width: 600px;
  max-height: 28px;
  width: 100%;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #aaa;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 50px;
`;

const ClearIcon = styled.span`
  position: absolute;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #aaa;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-left: 10px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
  max-height: 38px;
`;
