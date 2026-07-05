type ProfileCardProps = {
  name: string;
  role: string;
  status: string;
};

export default function ProfileCard({
  name,
  role,
  status,
}: ProfileCardProps) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-xl font-bold">
          {name.charAt(0)}
        </div>

        <div>
          <h2 className="text-lg font-bold">
            {name}
          </h2>

          <p className="text-sm text-zinc-400">
            {role}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>

            <span className="text-xs text-green-500">
              {status}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}