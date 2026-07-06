import { Search } from "lucide-react";
import Input from "@/components/ui/Input";

export default function TaskSearch() {
  return (
    <Input
      className="w-full lg:w-96"
      icon={<Search size={18} />}
      placeholder="Aufgabe suchen..."
      type="search"
    />
  );
}
