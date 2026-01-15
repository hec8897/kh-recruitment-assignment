import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface UseVirtualListProps {
  itemHeight: number; // TaskCard 높이 (px) + margin-bottom
  count: number; // 전체 아이템 개수
}

/**
 * 가상 리스트 훅
 * @param itemHeight - TaskCard 높이 (px) + margin-bottom
 * @param count - 전체 아이템 개수
 *
 * @example
 * ```tsx
 * const { parentRef, virtualizer, items } = useVirtualList({
 *   itemHeight: 94 + 16,
 *   count: tasks?.length || 0,
 * });
 *
 * return (
 *   <div ref={parentRef}>
 *     {items.map((virtualItem) => (
 *       <div key={virtualItem.index} style={{ height: `${virtualItem.size}px`, transform: `translateY(${virtualItem.start}px)` }}>
 *         {virtualItem.index}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @returns {
 *   parentRef: React.RefObject<HTMLDivElement>;
 *   virtualizer: Virtualizer<Element,>;
 *   items: VirtualItem[];
 * }
 */

export function useVirtualList({ itemHeight, count }: UseVirtualListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();

  return {
    parentRef,
    virtualizer,
    items,
  };
}
