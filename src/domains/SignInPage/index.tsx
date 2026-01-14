import { Button, Input } from "@/shared";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export function SignInPage() {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(PATHS.HOME);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-8">
      <h1 className="text-2xl font-bold">로그인</h1>
      <div className="flex flex-col gap-4 w-full">
        <Input label="이메일" placeholder="email@example.com" />
        <Input label="비밀번호" placeholder="비밀번호" type="password" />
      </div>
      <Button onClick={onSubmit}>로그인</Button>
    </div>
  );
}
