import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getTaskDetail } from "../api";

export function useTaskDetail(id: number) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskDetail(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}
