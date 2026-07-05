type RoleBadgeProps = {
  role: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  let color = "bg-zinc-700";

  switch (role) {
    case "Administrator":
      color = "bg-red-700";
      break;

    case "Veranstaltungsleitung":
      color = "bg-red-600";
      break;

    case "Security":
      color = "bg-blue-600";
      break;

    case "Technik":
      color = "bg-yellow-600";
      break;

    case "Gastro":
      color = "bg-green-600";
      break;

    case "Schauspieler":
      color = "bg-purple-600";
      break;
  }

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}
    >
      {role}
    </span>
  );
}