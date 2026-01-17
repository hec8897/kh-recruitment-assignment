import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/queryKeys";

import { deleteTask } from "../api";

export function useDeleteTask({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.task(context),
      });
      onSuccess();
    },
  });
}
