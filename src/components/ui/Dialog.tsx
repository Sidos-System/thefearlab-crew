"use client";

import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Dialog({
  open,
  title,
  description,
  children,
  onClose,
  className,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/58 p-4 backdrop-blur-xl"
      role="dialog"
    >
      <div
        className={cn(
          "w-full max-w-lg rounded-[24px] border border-border-soft bg-surface-2 p-6 shadow-[var(--shadow-soft)]",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-text-muted">
                {description}
              </p>
            )}
          </div>
          <Button
            aria-label="Dialog schließen"
            onClick={onClose}
            size="icon"
            variant="ghost"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
