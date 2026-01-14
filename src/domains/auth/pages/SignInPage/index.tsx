import { useState } from "react";

import { Button } from "@/shared";
import { EmailInput, PassWordInput, ErrorModal } from "../../components";

import { useSignIn } from "../../hooks/useSignIn";
import { FormProvider, useForm } from "react-hook-form";

import type { SignInRequest } from "@/types";

export function SignInPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutate: signIn } = useSignIn({
    onError: (errorMessage) => {
      setErrorMessage(errorMessage ?? "");
    },
  });

  const form = useForm<SignInRequest>({
    values: {
      email: "test@example.com",
      password: "password123",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSubmit = handleSubmit((data: SignInRequest) => {
    signIn(data);
  });

  return (
    <>
      <ErrorModal
        onClose={() => setErrorMessage("")}
        errorMessage={errorMessage}
      />
      <div className="max-w-[430px] m-auto min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-8">
        <h1 className="text-2xl font-bold">로그인</h1>
        <FormProvider {...form}>
          <div className="w-full space-y-4">
            <div className="flex flex-col gap-4 w-full">
              <EmailInput />
              <PassWordInput />
            </div>
            <Button disabled={!isValid} onClick={onSubmit}>
              로그인
            </Button>
          </div>
        </FormProvider>
      </div>
    </>
  );
}
