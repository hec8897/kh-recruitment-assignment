import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useUser() {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: getUser,
    select: (response) => response.data,
  });
}
