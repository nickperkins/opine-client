import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setPage(page);
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button className={page === p ? "current" : ""} key={p} onClick={() => handlePageChange(p)}>{p}</button>
      ))}
    </div>
  );
};

export default Pagination;