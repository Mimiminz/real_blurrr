import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { fetchBoardSearch } from "@/api/league";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    // if (!keyword.trim()) return;
    onSearch(keyword);
    setKeyword("");
  };
  return (
    <Container>
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
      </SearchContainer>
      <button onClick={handleSubmit}>검색</button>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: 40%;
  display: flex;
  align-items: center;

  button {
    padding: 10px; /* 넉넉한 패딩을 주어 버튼의 높이를 조정 */
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-left: 10px; /* 검색 창과 버튼 사이의 간격 조정 */
    background-color: white; /* 버튼 배경색 추가 */
    cursor: pointer; /* 커서 포인터 추가 */
    font-size: 1rem; /* 글꼴 크기 조정 */
    min-width: 64px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 5px 10px;
  max-width: 600px;
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
  font-size: 1rem;
  border-radius: 50px;
`;
