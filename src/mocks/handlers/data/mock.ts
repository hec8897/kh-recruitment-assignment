import type { Task } from "@/types";

export const tasks: Task[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Task ${index + 1}`,
  memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  status: index % 2 === 0 ? "TODO" : "DONE",
}));
