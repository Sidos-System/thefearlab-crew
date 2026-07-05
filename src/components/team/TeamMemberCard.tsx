import RoleBadge from "./RoleBadge";

type TeamMemberCardProps = {
  name: string;
  role: string;
  status: string;
};

export default function TeamMemberCard({
  name,
  role,
  status,
}: TeamMemberCardProps) {
  const statusColor =
    status === "Einsatzbereit"
      ? "text-green-500"
      : status === "Pause"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:border-red-700">

      <div className="flex justify-between">

        <div className="flex gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-2xl font-bold">
            {name.charAt(0)}
          </div>

          <div>

            <h2 className="text-xl font-bold">
              {name}
            </h2>

            <div className="mt-2">
              <RoleBadge role={role} />
            </div>

            <p className={`mt-3 font-semibold ${statusColor}`}>
              ● {status}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}