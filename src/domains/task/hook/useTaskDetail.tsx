import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getTaskDetail } from "../api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export function useTaskDetail(id: number) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const query = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskDetail(id),
    select: (response) => response.data,
    enabled: !!id,
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
