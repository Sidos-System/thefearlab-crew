import AppShell from "@/components/layout/AppShell";

export default function TaskDetailPage() {
  return (
    <AppShell
      title="Aufgabe"
      subtitle="Details"
    >
      <div className="space-y-8">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <h2 className="text-3xl font-bold">
            Lichter im Garten prüfen
          </h2>

          <p className="mt-5 text-zinc-400">
            Alle LED-Strahler und Flutlichter testen.
          </p>

        </div>

        <div className="grid gap-6 xl:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h3 className="text-lg font-semibold">
              Informationen
            </h3>

            <div className="mt-5 space-y-3">

              <p>
                Priorität:
                <span className="ml-2 rounded bg-red-700 px-2 py-1 text-sm">
                  Hoch
                </span>
              </p>

              <p>Status: Offen</p>

              <p>Verantwortlich: Maurice</p>

              <p>Fällig: 12.09.2026</p>

            </div>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h3 className="text-lg font-semibold">
              Kommentare
            </h3>

            <div className="mt-5 rounded-xl bg-zinc-800 p-4">

              <p className="font-semibold">
                Chris
              </p>

              <p className="mt-2 text-zinc-400">
                Ich übernehme das heute Nachmittag.
              </p>

            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}