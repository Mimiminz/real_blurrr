import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import SearchBar from "@/components/common/UI/SearchBar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  followChannel,
  unfollowChannel,
  fetchChannelInfo,
} from "@/api/channel";
import { useChannelStore } from "@/store/channelStore";
import { Mentioned } from "@/types/channelType";

interface PostInfo {
  id: string;
  name: string;
  imgUrl: string;
  info: string;
  owner: string;
  followCount: number;
  tags: Mentioned[];
  isFollowed: boolean;
}

interface PostTitleProps {
  channelType: string;
  onSearch: (keyword: string) => void;
  onSortChange: (sort: string) => void;
}

const PostTitle: React.FC<PostTitleProps> = ({
  channelType,
  onSearch,
  onSortChange,
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("게시글 정렬");
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [title, setTitle] = useState("");

  const dashcamId = process.env.NEXT_PUBLIC_DASHCAM_ID as string;
  const boastId = process.env.NEXT_PUBLIC_BOAST_ID as string;

  const { setChannelName, setChannelId, channelName, channelId } =
    useChannelStore();

  const getChannelInfo = useCallback(
    async (channelType: string) => {
      try {
        let actualChannelId = "";
        if (channelType === "dashcam") {
          actualChannelId = dashcamId;
        } else if (channelType === "boast") {
          actualChannelId = boastId;
        } else {
          actualChannelId = channelType;
        }
        setChannelId(actualChannelId);

        const info: PostInfo = await fetchChannelInfo(actualChannelId);
        setIsFollowing(info.isFollowed);
        setTitle(info.name);

        if (info && info.name) {
          setChannelName(info.name);
        } else {
          throw new Error("Invalid channel info received");
        }
      } catch (error) {
        console.error("Error fetching channel info:", error);
      }
    },
    [dashcamId, boastId, setChannelName, setChannelId]
  );

  useEffect(() => {
    getChannelInfo(channelType);
  }, [channelType, getChannelInfo]);

  const handleCreatePost = () => {
    if (channelType === "dashcam") {
      router.push(`/channels/dashcam/write`);
    }
    else if (channelId) {
      router.push(`/channels/${channelId}/write`);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleFollowChannel = async () => {
    if (!channelId) return;

    try {
      if (isFollowing) {
        await unfollowChannel(channelId);
      } else {
        await followChannel(channelId);
      }
      setIsFollowing(!isFollowing); // 팔로우 상태 토글
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
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
        <h1>{title}</h1> {/* 실제 채널 이름을 표시 */}
        <SideSection $isLoggedIn={isLoggedIn}>
          {isLoggedIn && isFollowing !== null && (
            <SetButton $isFollowing={isFollowing} onClick={handleFollowChannel}>
              {isFollowing ? "언팔로우 -" : "팔로우 +"}
            </SetButton>
          )}
          <SearchBar onSearch={onSearch} />
        </SideSection>
        <FilterSection>
          <DropdownButton onClick={handleDropdownToggle} onBlur={handleBlur}>
            {selectedSort}
            <span>▼</span>
          </DropdownButton>
          {isDropdownVisible && (
            <DropdownMenu>
              {["최신순", "댓글수", "조회수", "좋아요"].map((sort, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSortChange(sort)}
                >
                  {sort}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
          {isLoggedIn && (
            <StyledButton onClick={handleCreatePost}>글 작성 +</StyledButton>
          )}
        </FilterSection>
      </TitleSection>
    </Container>
  );
};

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
`;

const SetButton = styled.button<{ $isFollowing: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ $isFollowing }) => ($isFollowing ? "#f1f1f1" : "#333")};
  color: ${({ $isFollowing }) => ($isFollowing ? "#333" : "#f1f1f1")};
  white-space: nowrap;
`;

const StyledButton = styled.button`
  padding: 6px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  align-items: center;
  height: 35px;
  color: #333;
  white-space: nowrap;
  margin-left: auto;

  &:hover {
    color: #f97316;
  }

  @media (min-width: 768px) {
    padding: 8px;
    font-size: 14px;
    height: 40px;
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
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  padding: 5px 0px;
  top: 45px;
  width: 110px;
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

const SideSection = styled.div<{ $isLoggedIn: boolean }>`
  display: flex;
  justify-content: ${({ $isLoggedIn }) => ($isLoggedIn ? "space-between" : "flex-end")};
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export default PostTitle;
