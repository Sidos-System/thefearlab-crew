"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white shadow-[0_14px_32px_rgba(224,32,42,0.22)] hover:bg-accent-hover",
        secondary: "border border-border-soft bg-surface-raised/80 text-white hover:bg-surface-raised",
        ghost: "text-text-secondary hover:bg-surface-raised/70 hover:text-white",
      },
      size: {
        default: "h-12",
        sm: "h-10 rounded-[18px] px-4 text-xs",
        lg: "h-14 px-6 text-base",
        icon: "h-12 w-12 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants>;

export default function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22 }}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
