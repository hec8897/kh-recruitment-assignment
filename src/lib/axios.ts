import axios from "axios";
import { tokenStorage } from "./storage";

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
  const token = tokenStorage.getAccessToken();
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

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clearTokens();

        return Promise.reject(error);
      }

      try {
        // 토큰 갱신 요청
        const { data } = await axios.post("/api/refresh", null, {
          headers: { Authorization: tokenHeader(refreshToken) },
        });

        // 새 토큰 저장
        tokenStorage.setTokens(data.accessToken, data.refreshToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = tokenHeader(data.accessToken);
        return api(originalRequest);
      } catch {
        // 갱신 실패 시 로그아웃
        tokenStorage.clearTokens();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
