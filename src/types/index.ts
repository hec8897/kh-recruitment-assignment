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

export interface Task {
  id: string;
  title: string;
  memo: string;
  status: "TODO" | "DONE";
}

export interface TaskDetail {
  id: string;
  title: string;
  memo: string;
  registerDatetime: string;
}

export interface ApiError {
  errorMessage: string;
}
