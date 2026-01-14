import { http, HttpResponse } from "msw";
import type { SignInRequest, AuthTokens } from "@/types";

export const authHandlers = [
  // POST /api/sign-in : 로그인 요청 처리
  http.post("/api/sign-in", async ({ request }) => {
    const { email, password } = (await request.json()) as SignInRequest;
    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      });
    }

    return HttpResponse.json(
      {
        errorMessage: "이메일 또는 비밀번호가 올바르지 않습니다.",
      },
      {
        status: 401,
      }
    );
  }),

  // POST /api/refresh 토큰 갱신
  http.post("/api/refresh", async ({ request }) => {
    const { refreshToken } = (await request.json()) as AuthTokens;
    if (!refreshToken) {
      return HttpResponse.json(
        {
          errorMessage: "리프레시 토큰이 필요합니다.",
        },
        {
          status: 401,
        }
      );
    }

    if (
      refreshToken === "mock-refresh-token" ||
      refreshToken === "new-mock-refresh-token" // 갱신된 새로운 토큰
    ) {
      return HttpResponse.json({
        accessToken: "new-mock-access-token",
        refreshToken: "new-mock-refresh-token",
      });
    }

    return HttpResponse.json(
      { errorMessage: "유효하지 않은 토큰입니다." },
      { status: 401 }
    );
  }),
];
