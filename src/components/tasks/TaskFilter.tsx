import Select from "@/components/ui/Select";

export default function TaskFilter() {
  return (
    <Select className="w-full md:w-56">
      <option>Alle Prioritäten</option>
      <option>Hoch</option>
      <option>Mittel</option>
      <option>Niedrig</option>
    </Select>
  );
}
