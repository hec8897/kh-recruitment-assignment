import type { ButtonHTMLAttributes } from "react";

import clsx from "clsx";

const buttonStyles = {
  base: "w-full py-2 rounded-md transition",
  primary: "bg-primary hover:bg-blue-600 text-white ",
  secondary: "bg-gray-300 hover:bg-gray-400",
  disabled: "bg-disabled opacity-50 cursor-not-allowed text-white ",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  disabled,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={clsx(
        buttonStyles.base,
        {
          [buttonStyles.disabled]: disabled,
        },
        {
          [buttonStyles.primary]: !disabled && variant === "primary",
          [buttonStyles.secondary]: !disabled && variant === "secondary",
        }
      )}>
      {children}
    </button>
  );
}
