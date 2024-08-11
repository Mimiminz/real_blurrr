"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import DashCamCard from "@/components/channel/dashcam/DashCamCard";
import PostTitle from "@/components/channel/PostTitle";
import { fetchDashCams } from "@/api/channel";
import { DashCamList, DashCam } from "@/types/channelType";
import Loading from "@/components/common/UI/Loading";
import PaginationComponent from "@/components/common/UI/Pagination";

const DashCamPage: React.FC = () => {
  const [dashCams, setDashCams] = useState<DashCam[]>([]);
  const [keyword, setKeyword] = useState('');
  const [sortCriteria, setSortCriteria] = useState('TIME');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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
    setKeyword(newKeyword);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDashCams(keyword, currentPage - 1, sortCriteria);
        if (data) {
          setDashCams(data.content);
          setTotalPages(data.totalPages);
        } else {
          setDashCams([]);
        }
      } catch (error) {
        console.error("Failed to load dash cam data:", error);
        setDashCams([]);
      } finally {
        setIsLoading(false);
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

  return (
    <Container>
      <PostTitle
        channelType="dashcam"
        onSearch={handleSearch}
        onSortChange={handleSortChange}
      />
      {isLoading ? (
        <Loading />
      ) : dashCams && dashCams.length === 0 ? (
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
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container >
  );
};

const Container = styled.div`
  padding: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
`;

const EmptyMessage = styled.p`
  padding: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;


export default DashCamPage;
