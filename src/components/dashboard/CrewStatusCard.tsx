import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

type CrewStatusCardProps = {
  name: string;
  role?: string;
  status: string;
  online?: boolean;
};

export default function CrewStatusCard({
  name,
  role = "Crew",
  status,
  online = false,
}: CrewStatusCardProps) {
  return (
    <Card padding="sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar
            name={name}
            size="md"
            status={online ? "online" : "offline"}
          />

          <div className="min-w-0">
            <p className="truncate font-bold">
              {name}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {role}
            </p>
          </div>
        </div>

        <Badge variant={online ? "success" : "default"}>
          {status}
        </Badge>
      </div>
    </Card>
  );
}
