import { http, HttpResponse } from "msw";
import type { User } from "@/types";

const mockUser: User = {
  name: "John Doe",
  memo: "This is a memo",
};

export const userHandlers = [
  // GET /api/user
  http.get("/api/user", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    return HttpResponse.json(mockUser);
  }),
];
