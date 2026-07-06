"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export default function Input({
  className,
  icon,
  ...props
}: InputProps) {
  return (
    <label
      className={cn(
        "flex h-14 items-center gap-3 rounded-[18px] border border-border-soft bg-surface-1 px-4 text-text-secondary transition duration-200",
        "focus-within:border-accent/60 focus-within:text-white",
        className,
      )}
    >
      {icon}
      <input
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-text-muted"
        {...props}
      />
    </label>
  );
}
