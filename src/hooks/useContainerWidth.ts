import { useRef, useState, useEffect, useCallback } from 'react';

export function useContainerWidth(defaultWidth = 1200) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(defaultWidth);

  const updateWidth = useCallback(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      updateWidth();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [updateWidth]);

  return { ref, width };
}
