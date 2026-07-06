import { LucideIcon } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

type ActivityCardProps = {
  title: string;
  time: string;
  icon: LucideIcon;
  person: string;
};

export default function ActivityCard({
  title,
  time,
  icon: Icon,
  person,
}: ActivityCardProps) {
  return (
    <div className="flex gap-4">
      <Avatar
        name={person}
        size="sm"
        status="online"
      />

      <div className="min-w-0 flex-1 rounded-[20px] border border-border-soft bg-surface-2 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-semibold">
              {title}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {person} · {time}
            </p>
          </div>

          <div className="rounded-[16px] bg-surface-raised p-2 text-text-secondary">
            <Icon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
