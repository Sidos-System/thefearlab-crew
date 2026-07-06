import { cn } from "@/lib/utils";

type ProgressRingProps = {
  value: number;
  label: string;
  className?: string;
};

export default function ProgressRing({
  value,
  label,
  className,
}: ProgressRingProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn("relative h-24 w-24", className)}>
      <svg
        aria-label={label}
        className="-rotate-90"
        viewBox="0 0 96 96"
      >
        <circle
          className="stroke-white/10"
          cx="48"
          cy="48"
          fill="none"
          r={radius}
          strokeWidth="9"
        />
        <circle
          className="stroke-accent"
          cx="48"
          cy="48"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth="9"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-black">
        {normalizedValue}%
      </div>
    </div>
  );
}
