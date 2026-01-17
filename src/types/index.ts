export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface User {
  name: string;
  memo: string;
}

export interface DashboardData {
  numOfTask: number;
  numOfRestTask: number;
  numOfDoneTask: number;
}

export interface BaseTask {
  id: number;
  title: string;
  memo: string;
}
export interface Task extends BaseTask {
  status: "TODO" | "DONE";
}

export interface TaskDetail extends BaseTask {
  registerDatetime: string;
}

export interface TaskListResponse {
  tasks: Task[];
  totalCount: number;
  hasNext: boolean;
}

export interface ApiError {
  errorMessage: string;
}
