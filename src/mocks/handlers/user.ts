import { http, HttpResponse } from "msw";

import type { User } from "@/types";

import { validateToken } from "./auth";

const mockUser: User = {
  name: "John Doe",
  memo: "This is a memo",
};

export const userHandlers = [
  // GET /api/user
  http.get("/api/user", ({ request }) => {
    if (!validateToken(request)) {
      return HttpResponse.json(
        { errorMessage: "토큰이 만료되었습니다." },
        { status: 401 }
      );
    }

    return HttpResponse.json(mockUser);
  }),
];
