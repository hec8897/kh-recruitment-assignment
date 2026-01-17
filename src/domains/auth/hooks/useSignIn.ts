import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { tokenStorage } from "@/lib/storage";
import { PATHS } from "@/routes/paths";
import type { ApiError } from "@/types";

import { signIn } from "../api";

import type { AxiosError } from "axios";


interface UseSignInProps {
  onError: (errorMessage: string) => void;
}

export function useSignIn({ onError }: UseSignInProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ?? PATHS.HOME;

  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ data: { accessToken, refreshToken } }) => {
      tokenStorage.setTokens(accessToken, refreshToken);
      navigate(redirect);
    },
    onError: (error: AxiosError) => {
      onError((error.response?.data as ApiError)?.errorMessage ?? "");
    },
  });
}
