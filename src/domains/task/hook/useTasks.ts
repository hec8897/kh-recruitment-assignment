import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import { getTasks } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PATHS } from "@/routes/paths";

export function useTasks() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const query = useInfiniteQuery({
    queryKey: ["tasks"],
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
