import { Clock3, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

type TaskCardProps = {
  title: string;
  priority?: string | null;
  location?: string | null;
  time?: string | null;
  status?: string | null;
};

export default function TaskCard({
  title,
  priority,
  location,
  time,
  status,
}: TaskCardProps) {
  const priorityVariant = priority === "Hoch" ? "accent" : "warning";

  return (
    <Card
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      padding="sm"
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="mt-1 h-5 w-5 shrink-0 rounded-md border border-white/16 bg-surface-1" />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">
              {title}
            </h3>
            {priority && (
              <Badge variant={priorityVariant}>
                {priority}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-3 text-sm text-text-muted">
            {location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {location}
              </span>
            )}
            {time && (
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={14} />
                {time}
              </span>
            )}
          </div>
        </div>
      </div>

      {status && <Badge>{status}</Badge>}
    </Card>
  );
}
