import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/queryKeys";

import { getDashboard } from "../api";

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: getDashboard,
    select: (response) => response.data,
  });
}
