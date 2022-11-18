import { useMemo } from "react";

export const usePagination = (page: number, totalPages: number) =>
  useMemo(() => {
    const pages = [];
    if (totalPages <= 7) {
      if (!totalPages) return [1];
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
      }
      return pages;
    }
    const pagesCount = 7;

    if (page >= pagesCount && page <= totalPages - pagesCount + 1) {
      pages.push(page);
      pages.unshift(page - 1);
      pages.unshift(page - 2);
      pages.unshift(null);
      pages.push(page + 1);
      pages.push(page + 2);
      pages.push(null);
    } else if (page <= totalPages - pagesCount + 1) {
      for (let i = 0; i < pagesCount - 1; i++) {
        pages.push(i + 2);
      }
      pages.push(null);
    } else {
      pages.push(null);
      for (let i = 1; i < pagesCount; i++) {
        pages.push(totalPages - pagesCount + i);
      }
    }

    pages.unshift(1);
    pages.push(totalPages);
    return pages;
  }, [page, totalPages]);
