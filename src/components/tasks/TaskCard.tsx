import Link from "next/link";

type TaskCardProps = {
  title: string;
  priority: "Niedrig" | "Mittel" | "Hoch";
  status: "Offen" | "In Bearbeitung" | "Erledigt";
};

export default function TaskCard({
  title,
  priority,
  status,
}: TaskCardProps) {
  const priorityColor = {
    Niedrig: "bg-green-600",
    Mittel: "bg-yellow-600",
    Hoch: "bg-red-700",
  };

  return (
    <Link href="/tasks/1">

      <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-700 hover:bg-zinc-800">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-bold">
            {title}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${priorityColor[priority]}`}
          >
            {priority}
          </span>

        </div>

        <p className="mt-5 text-zinc-400">
          Status: {status}
        </p>

      </div>

    </Link>
  );
}