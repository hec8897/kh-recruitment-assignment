import { useState } from "react";

import { Button } from "@/shared";
import { EmailInput, PassWordInput, ErrorModal } from "../../components";

import { useSignIn } from "../../hooks/useSignIn";
import { FormProvider, useForm } from "react-hook-form";

import type { SignInRequest } from "@/types";

const defaultValues = import.meta.env.DEV
  ? {
      email: import.meta.env.VITE_DEV_EMAIL,
      password: import.meta.env.VITE_DEV_PASSWORD,
    }
  : { email: "", password: "" };

export function SignInPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutate: signIn, isPending } = useSignIn({
    onError: (errorMessage) => {
      setErrorMessage(errorMessage ?? "");
    },
  });

  const form = useForm<SignInRequest>({
    values: {
      ...defaultValues,
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
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage("")}
        errorMessage={errorMessage}
      />
      <div className="max-w-[430px] m-auto min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-8">
        <h1 className="text-2xl font-bold">로그인</h1>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="w-full">
            <div className="flex flex-col gap-4 w-full mb-8">
              <EmailInput />
              <PassWordInput />
            </div>
            <Button disabled={!isValid || isPending} type="submit">
              {isPending ? "로그인중..." : "로그인"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
