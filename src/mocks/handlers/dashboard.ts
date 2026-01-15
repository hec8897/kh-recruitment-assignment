import { http, HttpResponse } from "msw";
import { tasks } from "./data/mock";

import type { DashboardData } from "@/types";

const getDashboardData = (): DashboardData => ({
  numOfTask: tasks.length,
  numOfRestTask: tasks.filter((t) => t.status === "TODO").length,
  numOfDoneTask: tasks.filter((t) => t.status === "DONE").length,
});

export const dashboardHandlers = [
  http.get("/api/dashboard", async () => {
    return HttpResponse.json(getDashboardData());
  }),
];
