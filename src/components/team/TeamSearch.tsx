import { Search } from "lucide-react";
import Input from "@/components/ui/Input";

export default function TeamSearch() {
  return (
    <Input
      className="w-full lg:w-96"
      icon={<Search size={18} />}
      placeholder="Crewmitglied suchen..."
      type="search"
    />
  );
}
