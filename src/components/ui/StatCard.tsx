import { ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  icon: React.ReactNode;
};

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
}: StatCardProps) {
  return (
    <Card className="group min-h-[172px]" padding="md">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary transition duration-200 group-hover:text-white">
            {icon}
          </div>

          {trend && (
            <Badge variant="accent">
              <ArrowUpRight size={14} />
              {trend}
            </Badge>
          )}
        </div>

        <div className="mt-8">
          <div className="text-4xl font-black tracking-tight sm:text-5xl">
            {value}
          </div>
          <h3 className="mt-3 text-sm font-semibold text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </Card>
  );
}
