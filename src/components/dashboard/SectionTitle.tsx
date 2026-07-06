type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 max-w-2xl text-sm text-text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
