import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[18px] bg-surface-raised/70",
        className,
      )}
    />
  );
}
