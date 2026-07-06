import Card from "@/components/ui/Card";

type InfoCardProps = {
  title: string;
  value: string;
};

export default function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <Card>
      <p className="text-sm font-semibold text-text-muted">
        {title}
      </p>
      <h2 className="mt-5 text-5xl font-black">
        {value}
      </h2>
    </Card>
  );
}
