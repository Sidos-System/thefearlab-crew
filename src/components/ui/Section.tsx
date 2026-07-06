type SectionProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`space-y-5 ${className}`}>
      {(title || subtitle) && (
        <div>
          {title && (
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm text-text-muted sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
