import { api } from "@/lib/axios";
import type { SignInRequest, AuthTokens } from "@/types";

export const signIn = (data: SignInRequest) =>
  api.post<AuthTokens>("/sign-in", data);
