export default function Sidebar() {
  return (
    <nav className="flex flex-col gap-2 p-6">

      <button className="rounded-xl bg-red-700 px-4 py-3 text-left font-semibold hover:bg-red-800">
        🏠 Dashboard
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        👥 Team
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        📅 Zeitplan
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        ✅ Aufgaben
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        💬 Chat
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        📄 Dokumente
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        📦 Inventar
      </button>

      <button className="rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        ⚙ Einstellungen
      </button>

    </nav>
  );
}