type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-white">
      {children}
    </main>
  );
}
