import { api } from "@/lib/axios";
import type { DashboardData } from "@/types";

export const getDashboard = () => api.get<DashboardData>("/dashboard");
