import { TaskCard } from "./TaskCard";
import { useTasks, useIntersectionObserver, useVirtualList } from "../../hook";

const ITEM_HEIGHT = 94 + 16; // TaskCard 높이 (px) + margin-bottom

export function TaskList() {
  const { data: tasks, isLoading, fetchNextPage, hasNextPage } = useTasks();
  const { parentRef, virtualizer, items } = useVirtualList({
    itemHeight: ITEM_HEIGHT,
    count: tasks?.length || 0,
  });

  const ref = useIntersectionObserver({
    onCallback: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-full overflow-auto" ref={parentRef}>
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {items.map((virtualItem) => {
          const task = tasks?.[virtualItem.index];
          if (!task) return null;
          return (
            <div
              key={task.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}>
              <TaskCard task={task} />
            </div>
          );
        })}
      </div>
      <div ref={ref} />
    </div>
  );
}
