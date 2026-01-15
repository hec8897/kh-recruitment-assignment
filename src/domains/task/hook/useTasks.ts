import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import { getTasks } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PATHS } from "@/routes/paths";

export function useTasks() {
  const navigate = useNavigate();

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
    if (error) {
      if (isAxiosError(error)) {
        navigate(PATHS.SIGN_IN);
      }
    }
  }, [error, navigate]);

  return query;
}
