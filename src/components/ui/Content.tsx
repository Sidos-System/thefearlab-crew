type ContentProps = {
  children: React.ReactNode;
};

export default function Content({
  children,
}: ContentProps) {
  return (
    <div className="space-y-8">
      {children}
    </div>
  );
}