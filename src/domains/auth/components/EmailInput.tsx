import { useFormContext } from "react-hook-form";

import { Input } from "@/shared";

import type { SignInFormData } from "../schemas/signInSchema";

export function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignInFormData>();

  return (
    <Input
      label="이메일"
      placeholder="email@example.com"
      error={errors.email?.message}
      {...register("email")}
    />
  );
}
