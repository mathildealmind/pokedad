"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_BATCH_SIZE = 24;

export function useProgressiveItems<T>(
  items: T[],
  batchSize = DEFAULT_BATCH_SIZE
) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(batchSize);

  const resetProgress = useCallback(() => {
    setVisibleCount(batchSize);
  }, [batchSize]);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || visibleCount >= items.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setVisibleCount((currentVisibleCount) =>
          Math.min(currentVisibleCount + batchSize, items.length)
        );
      },
      { rootMargin: "500px 0px" }
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, [batchSize, items.length, visibleCount]);

  return {
    loadMoreRef,
    visibleItems: items.slice(0, visibleCount),
    visibleCount: Math.min(visibleCount, items.length),
    resetProgress,
  };
}
