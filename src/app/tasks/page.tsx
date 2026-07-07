"use client";

import { FormEvent, useState } from "react";
import AddTaskButton from "@/components/tasks/AddTaskButton";
import PermissionGate from "@/components/auth/PermissionGate";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearch from "@/components/tasks/TaskSearch";
import AppShell from "@/components/layout/AppShell";
import EmptyState from "@/components/ui/EmptyState";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Select from "@/components/ui/Select";
import Skeleton from "@/components/ui/Skeleton";
import { useTasks } from "@/hooks/usePlatformData";
import usePermissions from "@/hooks/usePermissions";
import { createTask } from "@/services/platform";

export default function TasksPage() {
  const {
    data: tasks,
    loading,
    refresh,
  } = useTasks();
  const { can } = usePermissions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Mittel");
  const [status, setStatus] = useState("Offen");
  const [location, setLocation] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const result = await createTask({
      title,
      description,
      priority,
      status,
      location,
      dueAt: dueAt ? new Date(dueAt).toISOString() : undefined,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Aufgabe konnte nicht erstellt werden.");
      return;
    }

    setDialogOpen(false);
    setTitle("");
    setDescription("");
    setPriority("Mittel");
    setStatus("Offen");
    setLocation("");
    setDueAt("");
    refresh();
  }

  return (
    <AppShell
      title="Aufgaben"
      subtitle="Alle offenen Aufgaben"
    >
      <PermissionGate
        fallback={(
          <EmptyState
            text="Dein Account besitzt keine Berechtigung für Aufgaben."
            title="Kein Zugriff"
          />
        )}
        permission="tasks.read"
      >
        <div className="space-y-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 md:flex-row">
            <TaskSearch />
            <TaskFilter />
          </div>

          {can("tasks.create") && (
            <AddTaskButton onClick={() => setDialogOpen(true)} />
          )}
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

        <Dialog
          description="Neue Aufgabe direkt in Supabase anlegen."
          onClose={() => setDialogOpen(false)}
          open={dialogOpen}
          title="Aufgabe erstellen"
        >
          <form
            className="space-y-4"
            onSubmit={submitTask}
          >
            <Input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Titel"
              required
              value={title}
            />
            <Input
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Beschreibung"
              value={description}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                onChange={(event) => setPriority(event.target.value)}
                value={priority}
              >
                <option>Hoch</option>
                <option>Mittel</option>
                <option>Niedrig</option>
              </Select>
              <Select
                onChange={(event) => setStatus(event.target.value)}
                value={status}
              >
                <option>Offen</option>
                <option>In Bearbeitung</option>
                <option>Erledigt</option>
              </Select>
            </div>
            <Input
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Ort"
              value={location}
            />
            <Input
              onChange={(event) => setDueAt(event.target.value)}
              type="datetime-local"
              value={dueAt}
            />

            {error && (
              <div className="rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
                {error}
              </div>
            )}

            <Button
              disabled={saving}
              type="submit"
            >
              {saving ? "Erstelle Aufgabe..." : "Aufgabe erstellen"}
            </Button>
          </form>
        </Dialog>
        </div>
      </PermissionGate>
    </AppShell>
  );
}
