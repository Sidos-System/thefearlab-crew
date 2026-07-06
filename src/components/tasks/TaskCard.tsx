import Link from "next/link";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { formatDateTime } from "@/lib/format";

type TaskCardProps = {
  id: string;
  title: string;
  priority?: string | null;
  status?: string | null;
  assignedTo?: string | null;
  dueAt?: string | null;
};

export default function TaskCard({
  id,
  title,
  priority,
  status,
  assignedTo,
  dueAt,
}: TaskCardProps) {
  const priorityVariant = priority === "Hoch" ? "accent" : priority === "Mittel" ? "warning" : "success";
  const statusVariant = status === "Erledigt" ? "success" : "default";

  return (
    <Link href={`/tasks/${id}`}>
      <Card className="h-full cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold">
              {title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {priority && (
                <Badge variant={priorityVariant}>
                  {priority}
                </Badge>
              )}
              {status && (
                <Badge variant={statusVariant}>
                  {status}
                </Badge>
              )}
            </div>
          </div>

          <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
            {status === "Erledigt" ? (
              <CheckCircle2 size={20} />
            ) : (
              <CalendarClock size={20} />
            )}
          </div>
        </div>

        <p className="mt-6 text-sm text-text-muted">
          {assignedTo ?? "Nicht zugewiesen"} · {formatDateTime(dueAt ?? null)}
        </p>
      </Card>
    </Link>
  );
}
