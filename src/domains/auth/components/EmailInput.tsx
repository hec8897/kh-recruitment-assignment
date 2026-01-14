import { Input } from "@/shared";
import { useFormContext } from "react-hook-form";

import type { SignInRequest } from "@/types";

export function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignInRequest>();
  return (
    <Input
      label="이메일"
      placeholder="email@example.com"
      error={errors.email?.message}
      {...register("email", {
        required: "이메일을 입력해주세요",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "올바른 이메일 형식이 아닙니다",
        },
      })}
    />
  );
}
