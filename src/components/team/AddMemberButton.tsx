import { UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AddMemberButton() {
  return (
    <Button disabled>
      <UserPlus size={18} />
      Crewmitglied hinzufügen
    </Button>
  );
}
