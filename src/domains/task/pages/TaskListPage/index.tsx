import { TaskCard } from "./TaskCard";
import { useTasks } from "../../hook/useTasks";

export function TaskList() {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
