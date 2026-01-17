import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";


import { QUERY_KEYS } from "@/lib/queryKeys";
import { PATHS } from "@/routes/paths";

import { getTaskDetail } from "../api";

export function useTaskDetail(id?: string) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  
  const NumberId = Number(id);

  const query = useQuery({
    queryKey: QUERY_KEYS.task(NumberId),
    queryFn: () => getTaskDetail(NumberId),
    select: (response) => response.data,
    enabled: NumberId !== undefined && !isNaN(NumberId),
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
