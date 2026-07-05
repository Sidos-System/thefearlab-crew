import AppShell from "@/components/layout/AppShell";

export default function InventoryPage() {
  return (
    <AppShell
      title="Inventar"
      subtitle="Materialverwaltung"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h2 className="text-2xl font-bold">
          Inventar
        </h2>

        <p className="mt-4 text-zinc-400">
          Das gesamte Inventar wird hier verwaltet.
        </p>

      </div>
    </AppShell>
  );
}