import Card from "@/components/ui/Card";

type QuickActionProps = {
  title: string;
  description: string;
};

export default function QuickAction({
  title,
  description,
}: QuickActionProps) {
  return (
    <Card className="cursor-pointer">
      <h3 className="text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-text-muted">
        {description}
      </p>
    </Card>
  );
}
