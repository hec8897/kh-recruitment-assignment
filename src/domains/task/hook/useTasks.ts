import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasks } from "../api";

export function useTasks() {
  return useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: ({ pageParam = 1 }) => getTasks({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.data.tasks),
  });
}
