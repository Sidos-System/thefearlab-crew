import AppShell from "@/components/layout/AppShell";

export default function DocumentsPage() {
  return (
    <AppShell
      title="Dokumente"
      subtitle="Alle Dateien"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h2 className="text-2xl font-bold">
          Dokumente
        </h2>

        <p className="mt-4 text-zinc-400">
          PDFs, Genehmigungen und Pläne erscheinen hier.
        </p>

      </div>
    </AppShell>
  );
}