import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useDeleteTask({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, context) => {
      console.log(context);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.task(context),
      });
      onSuccess();
    },
  });
}
