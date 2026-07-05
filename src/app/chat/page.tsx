import AppShell from "@/components/layout/AppShell";

export default function ChatPage() {
  return (
    <AppShell
      title="Chat"
      subtitle="Interne Kommunikation"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h2 className="text-2xl font-bold">
          Chat
        </h2>

        <p className="mt-4 text-zinc-400">
          Der Teamchat wird hier später integriert.
        </p>

      </div>
    </AppShell>
  );
}