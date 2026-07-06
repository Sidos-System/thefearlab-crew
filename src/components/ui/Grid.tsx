type GridProps = {
  children: React.ReactNode;
  columns?: "cards" | "stats" | "wide";
};

export default function Grid({
  children,
  columns = "cards",
}: GridProps) {
  const className = {
    cards: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
    stats: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
    wide: "grid gap-6 xl:grid-cols-2",
  }[columns];

  return (
    <div className={className}>
      {children}
    </div>
  );
}
