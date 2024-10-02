import React from 'react';
import Link from 'next/link';
import styles from '@/css/Pagination.module.css'; // Optional CSS module

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pages = [];
  
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };

  if (totalPages <= 7) {
    pages.push(...range(1, totalPages));
  } else {
    if (currentPage < 3) {
      pages.push(...range(1, 3));
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage > totalPages - 3) {
      pages.push(1);
      pages.push('...');
      pages.push(...range(totalPages - 3, totalPages));
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(...range(currentPage - 1, currentPage + 1));
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return (
    <div className={styles.pagination}>
      {/* Previous page link */}
      <Link href={`?page=${currentPage - 1}`} passHref>
        <span className={currentPage === 1 ? styles.disabled : ''}>&laquo;</span>
      </Link>

      {/* Page number links */}
      {pages.map((page, index) => (
        page === '...' ? (
          <span key={index} className={styles.ellipsis}>...</span>
        ) : (
          <Link key={page} href={`?page=${page}`} passHref>
            <span className={page === currentPage ? styles.active : ''}>{page}</span>
          </Link>
        )
      ))}

      {/* Next page link */}
      <Link href={`?page=${currentPage + 1}`} passHref>
        <span className={currentPage === totalPages ? styles.disabled : ''}>&raquo;</span>
      </Link>
    </div>
  );
};

export default Pagination;
