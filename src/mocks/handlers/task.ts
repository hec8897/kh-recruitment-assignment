import { http, HttpResponse } from "msw";
import { validateToken } from "./auth";
import type { Task, TaskDetail } from "@/types";

const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    memo: "Memo 1",
    status: "TODO",
  },
];

export const taskHandlers = [
  // GET /api/tasks : 목록
  http.get("api/tasks", ({ request }) => {
    if (!validateToken(request)) {
      return HttpResponse.json(
        { errorMessage: "토큰이 만료되었습니다." },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 20;

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTasks = tasks.slice(start, end);

    return HttpResponse.json({
      tasks: paginatedTasks,
      totalCount: tasks.length,
      hasNext: end < tasks.length,
    });
  }),
];
