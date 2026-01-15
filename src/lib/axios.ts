import axios from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const tokenHeader = (token: string) => {
  return `Bearer ${token}`;
};

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = tokenHeader(token);
  }
  return config;
});

// Response 인터셉터: 401 에러 시 토큰 갱신 시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 & 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        removeToken();

        return Promise.reject(error);
      }

      try {
        // 토큰 갱신 요청
        const { data } = await axios.post("/api/refresh", null, {
          headers: { Authorization: tokenHeader(refreshToken) },
        });

        // 새 토큰 저장
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = tokenHeader(data.accessToken);
        return api(originalRequest);
      } catch {
        // 갱신 실패 시 로그아웃
        removeToken();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
