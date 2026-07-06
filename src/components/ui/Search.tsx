import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchProps = {
  placeholder?: string;
  className?: string;
};

export default function Search({
  placeholder = "Suche nach Crew, Aufgaben, Dokumenten...",
  className,
}: SearchProps) {
  return (
    <label
      className={cn(
        "flex h-12 items-center gap-3 rounded-[18px] border border-border-soft bg-surface-1/70 px-4 text-text-secondary",
        "focus-within:border-accent/60 focus-within:text-white",
        className,
      )}
    >
      <SearchIcon size={18} />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-text-muted"
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
