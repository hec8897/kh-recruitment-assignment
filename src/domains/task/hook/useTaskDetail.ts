import { useEffect } from "react";

import { getTaskDetail } from "../api";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";
import { PATHS } from "@/routes/paths";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useTaskDetail(id: number) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const query = useQuery({
    queryKey: QUERY_KEYS.task(id),
    queryFn: () => getTaskDetail(id),
    select: (response) => response.data,
    enabled: id !== undefined && !isNaN(id),
  });

  const { error } = query;

  useEffect(() => {
    if (error && isAxiosError(error)) {
      if (error.response?.status === 401) {
        navigate(`${PATHS.SIGN_IN}?redirect=${currentPath}`);
      }
    }
  }, [error, navigate, currentPath]);

  return query;
}
