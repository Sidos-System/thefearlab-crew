import AppShell from "@/components/layout/AppShell";

export default function SettingsPage() {
  return (
    <AppShell
      title="Einstellungen"
      subtitle="Persönliche Einstellungen"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h2 className="text-2xl font-bold">
          Einstellungen
        </h2>

        <p className="mt-4 text-zinc-400">
          Hier befinden sich später alle Einstellungen.
        </p>

      </div>
    </AppShell>
  );
}