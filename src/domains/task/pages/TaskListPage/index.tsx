import { TaskCard } from "./TaskCard";
import { useTasks, useIntersectionObserver } from "../../hook";

export function TaskList() {
  const { data: tasks, isLoading, fetchNextPage, hasNextPage } = useTasks();

  const ref = useIntersectionObserver({
    onCallback: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <div ref={ref} />
    </div>
  );
}
