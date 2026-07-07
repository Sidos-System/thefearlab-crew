import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";

type AddTaskButtonProps = {
  onClick: () => void;
};

export default function AddTaskButton({
  onClick,
}: AddTaskButtonProps) {
  return (
    <Button onClick={onClick}>
      <Plus size={18} />
      Neue Aufgabe
    </Button>
  );
}
