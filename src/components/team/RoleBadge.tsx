import Badge from "@/components/ui/Badge";

type RoleBadgeProps = {
  role: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const variant = role === "Administrator" || role === "Veranstaltungsleitung"
    ? "accent"
    : "default";

  return (
    <Badge variant={variant}>
      {role}
    </Badge>
  );
}
