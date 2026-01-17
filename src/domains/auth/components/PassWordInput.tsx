import { useFormContext } from "react-hook-form";

import { Input } from "@/shared";

import type { SignInFormData } from "../schemas/signInSchema";

export function PassWordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignInFormData>();

  return (
    <Input
      label="비밀번호"
      placeholder="비밀번호"
      type="password"
      error={errors.password?.message}
      {...register("password")}
    />
  );
}
