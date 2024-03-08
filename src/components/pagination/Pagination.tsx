import React from 'react';
import styles from './Pagination.module.css'

type PaginationProps = {
    currentPage: number,
    totalCount: number,
    pageLimit: number,
    onPageChange: (pageNumber: number) => void,
}

const Pagination = ({currentPage, totalCount, pageLimit, onPageChange}: PaginationProps) => {
    const totalPages = Math.ceil(totalCount / pageLimit)
    const paginationNumbers: number[] = Array.from(Array(totalPages), (_, i) => i+1)

    return (
        <div className={styles.paginationContainer}>
            {paginationNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={currentPage === pageNumber ? styles.activePaginationButton : styles.paginationButton}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Pagination;