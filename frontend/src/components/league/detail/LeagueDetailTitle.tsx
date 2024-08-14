import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaHeart, FaEye } from "react-icons/fa";
import { HiEllipsisVertical } from "react-icons/hi2";
import { BiTimeFive } from "react-icons/bi";
import { BoardDetailProps } from "@/types/leagueTypes";
import { formatPostDate } from "@/utils/formatPostDate";
import { useAuthStore } from "@/store/authStore";
import { fetchBoardDelete } from "@/api/league";
import { useRouter } from "next/navigation";

const LeagueDetailTitle: React.FC<BoardDetailProps> = ({
  title,
  createdAt,
  viewCount,
  likeCount,
  username,
  authorprofileUrl,
  authorCarTitle,
  boardId,
  leagueName,
}) => {
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { user } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleDelete = async () => {
    try {
      const isDelete = confirm("정말 삭제하실건가요?");
      if (!isDelete) {
        return;
      }
      await fetchBoardDelete(boardId);
      router.push(`/league/${leagueName}`);
    } catch (error) {
      throw error;
    }
    setDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <Container>
      <TitleRow>
        <Title>{title}</Title>
        {user?.nickname === username && (
          <DropdownContainer ref={dropdownRef}>
            <HiEllipsisVertical onClick={handleDropdownToggle} />
            {isDropdownVisible && (
              <DropdownMenu>
                <DropdownItem onClick={handleDelete}>삭제</DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>
        )}
      </TitleRow>
      <InfoRow>
        <Author>
          <Avatar src={authorprofileUrl} alt={`${username}'s avatar`} />
          <AuthorInfo>
            <Username>{username}</Username>
            <CarInfo>{authorCarTitle || "뚜벅이"}</CarInfo>
          </AuthorInfo>
        </Author>
        <Infoleft>
          <Icons>
            <BiTimeFive />
            <Date>{formatPostDate(createdAt)}</Date>
            <FaEye />
            <Views>{viewCount}</Views>
            <FaHeart />
            <Likes>{likeCount}</Likes>
          </Icons>
        </Infoleft>
      </InfoRow>
    </Container>
  );
};

export default LeagueDetailTitle;

const Container = styled.div`
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;

  @media (min-width: 768px) {
    font-size: 24px;
    margin: 0 0 10px 0;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: auto;
  padding-top: 2px;

  svg {
    cursor: pointer;
    font-size: 23px;
    color: #999;
    transition: color 0.3s;

    &:hover {
      color: #ff900d;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
  min-width: 80px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    min-width: 120px;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background-color: white;
  color: #333;
  font-size: 13px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff900d;
    color: white;
  }

  &:first-child {
    border-bottom: 1px solid #ddd;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 13px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    font-size: 14px;
  }
`;

const Date = styled.span`
  margin-right: 15px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 5px;
    width: 100%;
  }
`;

const Views = styled.span`
  margin-right: 15px;
`;

const Likes = styled.span`
  margin-right: 15px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media (min-width: 768px) {
    justify-content: start;
  }
`;

const Author = styled.div`
  display: flex;
  font-size: 14.5px;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    margin-bottom: 0;
    font-size: 14.5px;
  }
`;

const CarInfo = styled.p`
  color: #888;
  margin: 0;
  font-size: 11px;
  @media (min-width: 480px) {
    font-size: 13px;
  }
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Infoleft = styled.div`
  display: flex;
  align-items: end;
  color: #474747;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 6px;
`;

const Username = styled.span`
  font-weight: bold;
`;
