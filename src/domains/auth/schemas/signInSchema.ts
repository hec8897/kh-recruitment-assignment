import { z } from "zod";

/**
 * 로그인 폼 Zod 스키마
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .max(24, "비밀번호는 24자 이하이어야 합니다")
    .regex(
      /^[a-zA-Z가-힣0-9]+$/,
      "비밀번호는 영문, 숫자, 한글만 사용할 수 있습니다"
    ),
});

/**
 * Zod 스키마로부터 타입 추론
 */
export type SignInFormData = z.infer<typeof signInSchema>;
