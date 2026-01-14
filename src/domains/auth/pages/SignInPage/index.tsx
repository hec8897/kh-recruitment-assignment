import { Button, Input } from "@/shared";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { useForm } from "react-hook-form";
import type { SignInRequest } from "@/types";

export function SignInPage() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInRequest>({
    values: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInRequest) => {
    console.log(data);
    navigate(PATHS.HOME);
  };

  return (
    <div className="max-w-[430px] m-auto min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-8">
      <h1 className="text-2xl font-bold">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex flex-col gap-4 w-full">
          <Input
            label="이메일"
            placeholder="email@example.com"
            {...register("email")}
          />
          <Input
            label="비밀번호"
            placeholder="비밀번호"
            type="password"
            {...register("password")}
          />
        </div>
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
}
