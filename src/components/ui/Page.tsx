type PageProps = {
  children: React.ReactNode;
};

export default function Page({
  children,
}: PageProps) {
  return (
    <div className="mx-auto w-full max-w-[1700px] space-y-8 px-2">
      {children}
    </div>
  );
}