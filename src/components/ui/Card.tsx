"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = HTMLMotionProps<"div"> & {
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
};

export default function Card({
  interactive = true,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -2 } : undefined}
      transition={{ duration: 0.22 }}
      className={cn(
        "rounded-[24px] border border-border-soft bg-surface-2/95 text-white shadow-[var(--shadow-soft)]",
        "transition-colors duration-200 hover:border-white/12",
        padding === "sm" && "p-4",
        padding === "md" && "p-6 sm:p-8",
        padding === "lg" && "p-7 sm:p-10",
        className,
      )}
      {...props}
    />
  );
}
