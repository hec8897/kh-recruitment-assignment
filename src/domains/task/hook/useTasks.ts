import { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { QUERY_KEYS } from "@/lib/queryKeys";
import { PATHS } from "@/routes/paths";

import { getTasks } from "../api";


export function useTasks() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.tasks,
    queryFn: ({ pageParam = 1 }) => getTasks({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.data.tasks),
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
