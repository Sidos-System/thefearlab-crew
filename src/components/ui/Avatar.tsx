type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "busy" | "offline";
};

export default function Avatar({
  name,
  size = "md",
  status,
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-9 w-9 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-16 w-16 text-xl",
  };

  return (
    <div className="relative inline-flex">
      <div className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-surface-raised font-black text-white shadow-lg shadow-black/25 ring-1 ring-white/10`}>
        {name.charAt(0).toUpperCase()}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ring-2 ring-surface-2 ${
            status === "online"
              ? "bg-emerald-400"
              : status === "busy"
                ? "bg-amber-300"
                : "bg-text-muted"
          }`}
        />
      )}
    </div>
  );
}
