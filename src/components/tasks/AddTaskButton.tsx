import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AddTaskButton() {
  return (
    <Button disabled>
      <Plus size={18} />
      Neue Aufgabe
    </Button>
  );
}
