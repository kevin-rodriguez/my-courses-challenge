import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollOptions<T> {
  initialData: T[];
  pageSize: number;
  loadMore: (offset: number, limit: number) => Promise<{
    success: boolean;
    data?: T[];
    error?: string;
  }>;
  enabled?: boolean;
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMoreRef: (node?: Element | null) => void;
}

export function useInfiniteScroll<T>({
  initialData,
  pageSize,
  loadMore,
  enabled = true,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length === pageSize);

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView && hasMore && !isLoadingMore && enabled) {
        setIsLoadingMore(true);
        try {
          const result = await loadMore(data.length, pageSize);
          if (result.success && result.data) {
            if (result.data.length === 0) {
              setHasMore(false);
            } else {
              setData((prev) => [...prev, ...result.data!]);
              setHasMore(result.data.length === pageSize);
            }
          } else {
            setHasMore(false);
          }
        } catch (error) {
          console.error("Error loading more data:", error);
          setHasMore(false);
        } finally {
          setIsLoadingMore(false);
        }
      }
    },
  });

  return {
    data,
    setData,
    isLoadingMore,
    hasMore,
    loadMoreRef,
  };
}

