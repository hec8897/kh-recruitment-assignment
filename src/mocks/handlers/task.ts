import { http, HttpResponse } from "msw";
import { validateToken } from "./auth";
import type { Task, TaskDetail } from "@/types";

export const tasks: Task[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Task ${index + 1}`,
  memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  status: index % 2 === 0 ? "TODO" : "DONE",
}));

export const getTaskDetail = (id: number): TaskDetail | null => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  return {
    ...task,
    registerDatetime: new Date(2024, 0, id).toLocaleDateString(), // 각 작업마다 다른 날짜
  };
};

export const taskHandlers = [
  // GET /api/tasks : 목록
  http.get("/api/task", ({ request }) => {
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

  // GET /api/tasks/:id : 상세
  http.get("/api/task/:id", ({ request, params }) => {
    if (!validateToken(request)) {
      return HttpResponse.json(
        { errorMessage: "토큰이 만료되었습니다." },
        { status: 401 }
      );
    }

    const { id } = params;
    const task = tasks.find((t) => t.id === Number(id));

    if (!task) {
      return HttpResponse.json(
        { errorMessage: "작업을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json(getTaskDetail(Number(id)));
  }),
];
