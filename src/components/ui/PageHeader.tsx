import Button from "./Button";

type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-text-muted sm:text-base">
          {subtitle}
        </p>
      </div>

      <Button className="w-full sm:w-auto">
        Neues erstellen
      </Button>
    </div>
  );
}
