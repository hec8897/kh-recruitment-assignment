import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onCallback: () => void;
  enabled?: boolean;
}

/**
 * 뷰포트에 진입하는 것을 감지하는 훅
 * @param onCallback - 뷰포트에 진입하는 것을 감지했을 때 호출될 콜백
 * @param enabled - 훅을 활성화할지 여부
 *
 * @example
 * ```tsx
 * const ref = useIntersectionObserver({
 *   onIntersect: () => fetchNextPage(),
 *   enabled: true of false,
 * });
 *
 * return <div ref={ref} />;
 * ```
 */

export function useIntersectionObserver({
  onCallback,
  enabled = true,
}: UseIntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onCallback();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onCallback, enabled]);

  return ref;
}
