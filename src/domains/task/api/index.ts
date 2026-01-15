import { api } from "@/lib/axios";
import type { TaskListResponse } from "@/types";

interface GetTasksParams {
  page?: number;
  limit?: number;
}

export const getTasks = ({ page = 1, limit = 20 }: GetTasksParams = {}) =>
  api.get<TaskListResponse>("/task", { params: { page, limit } });
