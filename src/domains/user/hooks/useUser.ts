import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { PATHS } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

import { getUser } from "../api";

import type { AxiosError } from "axios";

export function useUser() {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    select: (response) => response.data,
  });

  const { error } = query;

  useEffect(() => {
    const err = error as AxiosError;
    if (err) {
      if (err.status === 401) {
        navigate(PATHS.SIGN_IN);
      }
    }
  }, [error, navigate]);

  return query;
}
