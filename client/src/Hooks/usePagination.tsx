import { useEffect, useState } from "react";
import { PageManager } from "../types/types";

export interface UsePaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  goToPage: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: () => void;
  prevPage: () => void;
  error?: boolean;
}

export function usePagination<T>(
  fetchPage: (page: number) => Promise<PageManager<T>>
): UsePaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPage(currentPage)
      .then(({ data, num_pages, has_next, has_previous }) => {
        setData(data);
        setTotalPages(num_pages);
        setHasNext(has_next);
        setHasPrevious(has_previous);
      })
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, fetchPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    data,
    currentPage,
    totalPages,
    isLoading,
    hasNext,
    hasPrevious,
    goToPage,
    nextPage,
    prevPage,
    error,
  };
}
