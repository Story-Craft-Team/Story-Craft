'use client'

import { getAllStories, getStoriesByLimit } from "@/shared/api/stories/queries";
import { useCallback, useEffect, useState } from "react";
import s from './PaginationButton.module.scss'

interface Props {
  fetchStoriesByLimit: (page?: number, limit?: number) => Promise<void>;
}

export default function Pagination({ fetchStoriesByLimit }: Props) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [totalPages, setTotalPages] = useState(0)
  const numbers = []

  const handlePageChange = useCallback(async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
    await fetchStoriesByLimit(newPage, limit);
  }, [fetchStoriesByLimit, limit, totalPages]);

  useEffect(() => {
    const getStories = async () => {
      const res = await getAllStories()
      setTotalPages(Math.ceil(res.length / limit))
    }

    getStories()
  }, [])

  for (let i = 2; i <= totalPages; i++) {
    numbers.push(i)
  }

  return (
    <div className={s.paginationContainer}>
      <div
        className={`${s.pageItem} ${s.navButton} ${page === 1 ? s.disabled : ''}`}
        onClick={() => handlePageChange(page - 1)}
      >
        {"<"}
      </div>

      <div
        className={page === 1 ? s.activePageItem : s.pageItem}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </div>

      {page > 4 && totalPages > 7 && (
        <div className={`${s.pageItem} ${s.ellipsis}`}>...</div>
      )}

      {numbers.map(number => {
        if (
          number < totalPages &&
          number >= page - 2 &&
          number <= page + 3 &&
          totalPages > 7
        ) {
          return (
            <div
              className={page === number ? s.activePageItem : s.pageItem}
              onClick={() => handlePageChange(number)}
              key={number}
            >
              {number}
            </div>
          );
        }
        if (
          number <= page + 6 &&
          totalPages <= 7 &&
          number < totalPages
        ) {
          return (
            <div
              className={page === number ? s.activePageItem : s.pageItem}
              onClick={() => handlePageChange(number)}
              key={number}
            >
              {number}
            </div>
          );
        }
      })}

      {page < totalPages - 4 && totalPages > 7 && (
        <div className={`${s.pageItem} ${s.ellipsis}`}>...</div>
      )}

      {totalPages > 1 && (
        <div
          className={page === totalPages ? s.activePageItem : s.pageItem}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </div>
      )}


      <div
        className={s.pageItem}
        onClick={() => handlePageChange(page + 1)}
      >
        {">"}
      </div>
    </div>
  );
}