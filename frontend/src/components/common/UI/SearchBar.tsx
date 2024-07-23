import React from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from "react-icons/hi";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 5px 10px;
  max-width: 600px;
  width: 100%; /* 추가 */
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

const SearchBar: React.FC = () => {
  return (
    <SearchContainer>
      <SearchIcon><HiOutlineSearch /></SearchIcon>
      <SearchInput type="text" placeholder="Search" />
    </SearchContainer>
  );
};

export default SearchBar;
