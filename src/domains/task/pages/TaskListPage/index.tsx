import { tasks } from "@/mocks/handlers/task";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
