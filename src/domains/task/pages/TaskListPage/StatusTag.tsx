import clsx from "clsx";
import type { Task } from "@/types";

export function StatusTag({ status }: { status: Task["status"] }) {
  return (
    <span
      className={clsx("text-sm w-fit text-white px-2 py-1 rounded-md", {
        "bg-primary": status === "TODO",
        "bg-green-500": status === "DONE",
      })}>
      {status}
    </span>
  );
}
