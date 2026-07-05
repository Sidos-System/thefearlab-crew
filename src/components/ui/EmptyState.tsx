type EmptyStateProps = {
  text: string;
};

export default function EmptyState({
  text,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-700 p-12 text-center">

      <p className="text-zinc-500">
        {text}
      </p>

    </div>
  );
}