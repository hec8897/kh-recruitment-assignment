import { api } from "@/lib/axios";
import type { User } from "@/types";

export const getUser = () => api.get<User>("/user");
