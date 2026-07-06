import { ShieldCheck } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import RoleBadge from "./RoleBadge";

type TeamMemberCardProps = {
  name: string;
  role: string;
  status: string;
};

export default function TeamMemberCard({
  name,
  role,
  status,
}: TeamMemberCardProps) {
  const statusLabel = getStatusLabel(status);
  const statusVariant = status === "online" || status === "Einsatzbereit"
    ? "success"
    : status === "busy" || status === "break" || status === "Pause"
      ? "warning"
      : "default";
  const onlineStatus = status === "online" || status === "Einsatzbereit"
    ? "online"
    : status === "busy" || status === "break" || status === "Pause"
      ? "busy"
      : "offline";

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar
            name={name}
            size="lg"
            status={onlineStatus}
          />

          <div className="min-w-0">
            <h2 className="truncate text-xl font-black">
              {name}
            </h2>
            <div className="mt-2">
              <RoleBadge role={role} />
            </div>
          </div>
        </div>

        <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
          <ShieldCheck size={20} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-border-soft pt-5">
        <span className="text-sm text-text-muted">Status</span>
        <Badge variant={statusVariant}>
          {statusLabel}
        </Badge>
      </div>
    </Card>
  );
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    online: "Online",
    busy: "Beschäftigt",
    on_duty: "Im Einsatz",
    break: "Pause",
    offline: "Offline",
    sick: "Krank",
    vacation: "Urlaub",
  };

  return labels[status] ?? status;
}
