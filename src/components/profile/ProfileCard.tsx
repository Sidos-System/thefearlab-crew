import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

type ProfileCardProps = {
  name: string;
  role: string;
  status: string;
};

export default function ProfileCard({
  name,
  role,
  status,
}: ProfileCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-5">
          <Avatar name={name} size="lg" status="online" />
          <div className="min-w-0">
            <h2 className="truncate text-3xl font-black tracking-tight">
              {name}
            </h2>
            <p className="mt-1 text-text-muted">{role}</p>
            <div className="mt-3">
              <Badge variant="success">{status}</Badge>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-border-soft bg-surface-1 px-5 py-4 text-left sm:text-right">
          <p className="text-xs font-bold uppercase text-text-muted">
            Status
          </p>
          <p className="mt-2 text-xl font-black">
            {status}
          </p>
        </div>
      </div>
    </Card>
  );
}
