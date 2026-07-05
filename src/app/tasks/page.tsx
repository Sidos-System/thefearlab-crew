import AppShell from "@/components/layout/AppShell";
import TaskCard from "@/components/tasks/TaskCard";
import AddTaskButton from "@/components/tasks/AddTaskButton";
import TaskSearch from "@/components/tasks/TaskSearch";
import TaskFilter from "@/components/tasks/TaskFilter";

export default function TasksPage() {
  return (
    <AppShell
      title="Aufgaben"
      subtitle="Alle offenen Aufgaben"
    >
      <div className="space-y-8">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex flex-col gap-4 md:flex-row">

            <TaskSearch />

            <TaskFilter />

          </div>

          <AddTaskButton />

        </div>

        <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">

          <TaskCard
            title="Lichter im Garten prüfen"
            priority="Hoch"
            status="Offen"
          />

          <TaskCard
            title="Nebelmaschine testen"
            priority="Mittel"
            status="In Bearbeitung"
          />

          <TaskCard
            title="Getränke auffüllen"
            priority="Niedrig"
            status="Erledigt"
          />

        </div>

      </div>
    </AppShell>
  );
}