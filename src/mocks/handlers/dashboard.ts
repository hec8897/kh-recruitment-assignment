import { http, HttpResponse } from "msw";
import { isTokenValid } from "./auth";

import type { DashboardData } from "@/types";

const mockDashboard: DashboardData = {
  numOfTask: 10,
  numOfRestTask: 5,
  numOfDoneTask: 5,
};

export const dashboardHandlers = [
  http.get("/api/dashboard", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token || !isTokenValid(token)) {
      return HttpResponse.json(
        { errorMessage: "토큰이 만료되었습니다." },
        { status: 401 }
      );
    }

    return HttpResponse.json(mockDashboard);
  }),
];
