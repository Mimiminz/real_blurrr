"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import DashCamCard from "@/components/channel/dashcam/DashCamCard";
import PostTitle from "@/components/channel/PostTitle";
import { fetchDashCams } from "@/api/channel";
import { DashCam } from "@/types/channelType";
import Loading from "@/components/common/UI/Loading";
import PaginationComponent from "@/components/common/UI/Pagination";

const DashCamPage: React.FC = () => {
  const [dashCams, setDashCams] = useState<DashCam[]>([]);
  const [keyword, setKeyword] = useState('');
  const [sortCriteria, setSortCriteria] = useState('TIME');

  const router = useRouter();

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 검색
  const [isSearching, setIsSearching] = useState(false);

  const handleSortChange = (newSort: string) => {
    const criteriaMap: { [key: string]: string } = {
      '최신순': 'TIME',
      '댓글수': 'COMMENT',
      '조회수': 'VIEW',
      '좋아요': 'LIKE'
    };

    const newCriteria = criteriaMap[newSort] || 'TIME'; // 매핑되지 않는 경우 기본값 설정
    setSortCriteria(newCriteria);
  };

  const handleSearch = (newKeyword: string) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setKeyword(newKeyword);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if(keyword){
          setTotalPages(0);
        }
        const data = await fetchDashCams(keyword, currentPage - 1, sortCriteria);
        
        if (data) {
          setDashCams(data.content);
          setTotalPages(data.totalPages);

          console.log(data);
        } else {
          setDashCams([]);
        }
      } catch (error) {
        console.error("Failed to load dash cam data:", error);
        setDashCams([]);
      }
    };

    loadData();
  }, [keyword, sortCriteria, currentPage]);

  const handleCardClick = (dashCamDetailId: string) => {
    router.push(`/channels/dashcam/${dashCamDetailId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <Container>
      <PostTitle
        channelType="dashcam"
        onSearch={handleSearch}
        onSortChange={handleSortChange}
      />
      {dashCams && dashCams.length === 0 ? (
        <EmptyMessage>게시물이 없습니다.<br />직접 글을 작성해보세요!</EmptyMessage>
      ) : (
        <CardGrid>
          {dashCams.map((dashCam) => (
            <div key={dashCam.id} onClick={() => handleCardClick(dashCam.id)}>
              <DashCamCard dashCam={dashCam} />
            </div>
          ))}
        </CardGrid>
      )}
      {totalPages > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container >
  );
};

const Container = styled.div`
  padding: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center; 
  align-items: center;

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }

  @media (min-width: 2560px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const EmptyMessage = styled.p`
  padding: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;


export default DashCamPage;
