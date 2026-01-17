import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

import type { UseFormRegisterReturn } from "react-hook-form";


const inputStyles = {
  base: "w-full py-2 rounded-md text-base border px-4",
  error: "border-red-500",
  enabled: "border-gray-300",
  disabled: "border-gray-300",
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  label?: string;
  error?: string;
}

export function Input({ label, register, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        {...register}
        {...props}
        className={clsx(
          inputStyles.base,
          error ? inputStyles.error : inputStyles.enabled
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
