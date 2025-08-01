import React, { useEffect, useRef, useCallback } from 'react';
import { CircularProgress, Box, Button } from '@mui/material';
import './style.scss';

interface InfinityScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore?: boolean;
  loading?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export default function InfinityScroll({
  children,
  onLoadMore,
  hasMore = true,
  loading = false,
  threshold = 0.1,
  rootMargin = '100px'
}: InfinityScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, loading]);

  useEffect(() => {
    const element = loadingRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver, threshold, rootMargin]);

  return (
    <div className="infinity-scroll">
      {children}
      
      {/* Trigger element for intersection observer */}
      {hasMore && (
        <div ref={loadingRef} style={{ height: '20px' }}>
          {loading && (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={24} sx={{ color: '#FACC15' }} />
            </Box>
          )}
        </div>
      )}
    </div>
  );
}
