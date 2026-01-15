import { api } from "@/lib/axios";
import type { TaskDetail, TaskListResponse } from "@/types";

interface GetTasksParams {
  page?: number;
  limit?: number;
}

export const getTasks = ({ page = 1, limit = 20 }: GetTasksParams = {}) =>
  api.get<TaskListResponse>("/task", { params: { page, limit } });

export const getTaskDetail = (id: number) => api.get<TaskDetail>(`/task/${id}`);
