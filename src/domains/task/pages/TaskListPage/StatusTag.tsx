import { memo } from "react";

import clsx from "clsx";

import type { Task } from "@/types";

/**
 * 상태 태그 컴포넌트
 * React.memo로 불필요한 리렌더링 방지
 */
export const StatusTag = memo(function StatusTag({
  status,
}: {
  status: Task["status"];
}) {
  return (
    <span
      className={clsx("text-sm w-fit text-white px-2 py-1 rounded-md", {
        "bg-primary": status === "TODO",
        "bg-green-500": status === "DONE",
      })}>
      {status}
    </span>
  );
});
