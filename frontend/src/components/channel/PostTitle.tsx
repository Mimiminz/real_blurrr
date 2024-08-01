import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/common/UI/SearchBar';
import { useRouter } from "next/navigation";


interface PostTitleProps {
  channel: string;
  title: string;
  onSearch: (keyword: string) => void;
  onSortChange: (sort: string) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  flex: 1 0 auto;

  nav {
    font-size: 14px;
    color: #888;

    span {
      margin-right: 5px;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0;
  }

  .setButton {
    padding: 10px 20px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
  }

  .setPosition {
    display: flex;
    margin-left: auto;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  position: relative; 
`;

const DropdownButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white; 
  cursor: pointer;
  font-size: 14px;
  color: #969696;
  width: 100px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  padding: 5px 0px;
  top: 45px;
  width: 100px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const SideSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const PostTitle: React.FC<PostTitleProps> = ({ channel, title, onSearch, onSortChange }) => {
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('게시물 정렬');

  const handleCreatePost = () => {
    router.push(`/channels/${channel}/write`);
  };

  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 200); // 드롭다운 메뉴가 닫히기 전에 클릭 이벤트가 발생하도록 시간을 둠
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setDropdownVisible(false);
    onSortChange(sort);
  };

  return (
    <Container>
      <TitleSection>
        <h1>{title}</h1>
        <SideSection>
          <button className="setButton">팔로우 +</button>
          <SearchBar onSearch={onSearch} />
        </SideSection>
        <FilterSection>
          <DropdownButton onClick={handleDropdownToggle} onBlur={handleBlur}>
            {selectedSort}
            <span>▼</span>
          </DropdownButton>
          {isDropdownVisible && (
            <DropdownMenu>
              {['최신순', '댓글수', '조회수', '좋아요'].map((sort, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSortChange(sort)}
                >
                  {sort}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
          <button className="setPosition setButton" onClick={handleCreatePost}>글 작성 +</button>
        </FilterSection>
      </TitleSection>
    </Container>
  );
};

export default PostTitle;
