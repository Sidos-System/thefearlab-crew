type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="mb-10">

      <h2 className="mb-5 text-2xl font-semibold">
        {title}
      </h2>

      {children}

    </section>
  );
}