import { Button } from "@/shared";
export function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-8">로그인</h1>
      <Button disabled>로그인</Button>
    </div>
  );
}
