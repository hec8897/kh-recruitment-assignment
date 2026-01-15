import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: getDashboard,
    select: (response) => response.data,
  });
}
