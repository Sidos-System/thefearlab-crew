type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
      {children}
    </div>
  );
}