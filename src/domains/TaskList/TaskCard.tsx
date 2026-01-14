import { StatusTag } from "./StatusTag";
import type { Task } from "@/types";

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border border-gray-300 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-lg font-bold truncate">{task.title}</h3>
        <StatusTag status={task.status} />
      </div>

      <p className="truncate">{task.memo}</p>
    </div>
  );
}
