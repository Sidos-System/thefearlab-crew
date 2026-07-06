"use client";

import AddTaskButton from "@/components/tasks/AddTaskButton";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearch from "@/components/tasks/TaskSearch";
import AppShell from "@/components/layout/AppShell";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { useTasks } from "@/hooks/usePlatformData";

export default function TasksPage() {
  const {
    data: tasks,
    loading,
  } = useTasks();

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

        <Section
          subtitle="Priorisierte Arbeit mit Status, Zuständigkeit und Fälligkeit."
          title="Task Board"
        >
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          ) : tasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  priority={task.priority}
                  status={task.status}
                  assignedTo={task.assignedTo}
                  dueAt={task.dueAt}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              text="In Supabase sind noch keine Aufgaben vorhanden."
              title="Keine Aufgaben"
            />
          )}
        </Section>
      </div>
    </AppShell>
  );
}
