import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const buttonStyles = {
  base: "w-full py-2 rounded-md text-white transition font-bold",
  enabled: "bg-primary hover:bg-blue-600",
  disabled: "bg-disabled cursor-not-allowed",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={clsx(
        buttonStyles.base,
        disabled ? buttonStyles.disabled : buttonStyles.enabled
      )}>
      {children}
    </button>
  );
}
