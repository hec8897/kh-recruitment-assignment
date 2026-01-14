import { Input } from "@/shared";
import { useFormContext } from "react-hook-form";
import type { SignInRequest } from "@/types";

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
      })}
    />
  );
}
