import { Input } from "@/shared";
import { useFormContext } from "react-hook-form";

import type { SignInRequest } from "@/types";

const passwordPattern = /^[a-zA-Z가-힣0-9]+$/;

export function PassWordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignInRequest>();
  return (
    <Input
      label="비밀번호"
      placeholder="비밀번호"
      type="password"
      error={errors.password?.message}
      {...register("password", {
        required: "비밀번호를 입력해주세요",
        pattern: {
          value: passwordPattern,
          message: "비밀번호는 영문, 숫자, 한글만 사용할 수 있습니다",
        },
        minLength: {
          value: 8,
          message: "비밀번호는 8자 이상이어야 합니다",
        },
        maxLength: {
          value: 24,
          message: "비밀번호는 24자 이하이어야 합니다",
        },
      })}
    />
  );
}
