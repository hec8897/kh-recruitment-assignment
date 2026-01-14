import { http, HttpResponse } from "msw";
import type { SignInRequest, AuthTokens } from "@/types";

const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 60 * 30, // 30분
  REFRESH_TOKEN: 60 * 60 * 24, // 24시간
};

const TEST_USER = {
  email: "test@example.com",
  password: "password123",
  id: "mock-user-id",
} as const;

//* 토큰 생성함수
function createMockJwt(expiresSeconds: number) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      id: TEST_USER.id,
      exp: Math.floor(Date.now() / 1000) + expiresSeconds,
    })
  );

  return `${header}.${payload}.mock-signature`;
}

//* 토큰 유효성 검사 함수
function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function validateToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  return token && isTokenValid(token);
}

export const authHandlers = [
  // POST /api/sign-in : 로그인 요청 처리
  http.post("/api/sign-in", async ({ request }) => {
    const { email, password } = (await request.json()) as SignInRequest;
    if (email === TEST_USER.email && password === TEST_USER.password) {
      return HttpResponse.json({
        accessToken: createMockJwt(TOKEN_EXPIRY.ACCESS_TOKEN), // 30분 후 만료
        refreshToken: createMockJwt(TOKEN_EXPIRY.REFRESH_TOKEN), // 24시간
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

    if (isTokenValid(refreshToken)) {
      return HttpResponse.json({
        accessToken: createMockJwt(TOKEN_EXPIRY.ACCESS_TOKEN), // 30분 후 만료
        refreshToken: createMockJwt(TOKEN_EXPIRY.REFRESH_TOKEN), // 24시간
      });
    }

    return HttpResponse.json(
      { errorMessage: "유효하지 않은 토큰입니다." },
      { status: 401 }
    );
  }),
];
