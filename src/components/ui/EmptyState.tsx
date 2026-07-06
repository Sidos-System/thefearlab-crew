import { FileQuestion } from "lucide-react";
import Card from "@/components/ui/Card";

type EmptyStateProps = {
  title?: string;
  text: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  title = "Noch keine Daten",
  text,
  action,
}: EmptyStateProps) {
  return (
    <Card
      className="border-dashed text-center"
      interactive={false}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-surface-raised text-text-secondary">
        <FileQuestion size={24} />
      </div>
      <h3 className="mt-5 text-xl font-black">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
        {text}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
