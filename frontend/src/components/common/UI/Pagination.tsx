import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (data: { selected: number }) => {
    onPageChange(data.selected + 1);
  };

  return (
    <PaginationWrapper>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={currentPage - 1}
      />
    </PaginationWrapper>
  );
};

export default PaginationComponent;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination a {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    color: #333;
  }

  .pagination .active a {
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    border: none;
  }

  .pagination .disabled a {
    color: #ddd;
    pointer-events: none;
  }

  .pagination .break-me a {
    border: none;
  }
`;
