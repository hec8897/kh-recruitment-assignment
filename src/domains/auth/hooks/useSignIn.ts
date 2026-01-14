import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

import type { AxiosError } from "axios";
import type { ApiError } from "@/types";

interface UseSignInProps {
  onError: (errorMessage: string) => void;
}

export function useSignIn({ onError }: UseSignInProps) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ data: { accessToken, refreshToken } }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate(PATHS.HOME);
    },
    onError: (error: AxiosError) => {
      onError((error.response?.data as ApiError)?.errorMessage ?? "");
    },
  });
}
