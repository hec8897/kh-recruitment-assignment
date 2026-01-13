import { http, HttpResponse } from "msw";
import type { SignInRequest } from "@/types";

export const authHandlers = [
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
];
