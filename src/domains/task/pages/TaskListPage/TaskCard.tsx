import { memo } from "react";
import { Link } from "react-router-dom";

import { PATHS } from "@/routes/paths";
import type { Task } from "@/types";

import { StatusTag } from "./StatusTag";

interface TaskCardProps {
  task: Task;
}

/**
 * 할일 카드 컴포넌트
 * React.memo로 불필요한 리렌더링 방지
 */
export const TaskCard = memo(function TaskCard({ task }: TaskCardProps) {
  return (
    <Link
      to={PATHS.TASK_DETAIL.replace(":id", task.id.toString())}
      className="border border-gray-300 rounded-xl p-4 flex flex-col gap-2 cursor-pointer">
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-lg font-bold truncate">{task.title}</h3>
        <StatusTag status={task.status} />
      </div>

      <p className="truncate">{task.memo}</p>
    </Link>
  );
});
