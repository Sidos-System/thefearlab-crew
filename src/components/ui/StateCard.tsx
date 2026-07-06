import Card from "./Card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <Card className="h-full">

      <div className="flex h-full flex-col justify-between">

        <p className="text-sm font-semibold text-text-muted">
          {title}
        </p>

        <div className="mt-8 flex items-end justify-between">

          <h2 className="text-6xl font-black leading-none tracking-tight">
            {value}
          </h2>

          {icon && (
            <div className="text-text-secondary">
              {icon}
            </div>
          )}

        </div>

      </div>

    </Card>
  );
}
