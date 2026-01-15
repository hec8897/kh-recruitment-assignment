import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api";
import { PATHS } from "@/routes/paths";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants";

import type { AxiosError } from "axios";
import type { ApiError } from "@/types";

interface UseSignInProps {
  onError: (errorMessage: string) => void;
}

export function useSignIn({ onError }: UseSignInProps) {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const redirect = searchParams.get("redirect") || PATHS.HOME;

  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ data: { accessToken, refreshToken } }) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      navigate(redirect);
    },
    onError: (error: AxiosError) => {
      onError((error.response?.data as ApiError)?.errorMessage ?? "");
    },
  });
}
