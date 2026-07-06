"use client";

import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  children,
  className,
  ...props
}: SelectProps) {
  return (
    <label
      className={cn(
        "relative flex h-14 items-center rounded-[18px] border border-border-soft bg-surface-1 text-text-secondary transition duration-200",
        "focus-within:border-accent/60 focus-within:text-white",
        className,
      )}
    >
      <select
        className="h-full w-full appearance-none rounded-[18px] bg-transparent px-4 pr-11 text-sm font-semibold text-white outline-none"
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 text-text-muted"
        size={17}
      />
    </label>
  );
}
