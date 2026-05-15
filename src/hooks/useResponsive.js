import { useState, useEffect } from 'react';

/**
 * 뷰포트 너비 기반 반응형 훅
 * 기준: 768px 이하 → isMobile = true
 */
export function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return { isMobile: width < 768, width };
}
