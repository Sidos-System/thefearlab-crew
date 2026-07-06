import Card from "@/components/ui/Card";

type NewsCardProps = {
  title: string;
  description: string;
};

export default function NewsCard({
  title,
  description,
}: NewsCardProps) {
  return (
    <Card>
      <h3 className="text-xl font-black">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-text-muted">
        {description}
      </p>
    </Card>
  );
}
