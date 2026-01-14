import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api";

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
