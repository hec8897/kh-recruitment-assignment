import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signIn } from "../api";
import { PATHS } from "@/routes/paths";
import { tokenStorage } from "@/lib/storage";

import type { AxiosError } from "axios";
import type { ApiError } from "@/types";

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
