"use client";

import { useParams } from "next/navigation";
import { CalendarClock, MapPin, UserRound, type LucideIcon } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { useTasks } from "@/hooks/usePlatformData";
import { formatDateTime } from "@/lib/format";

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>();
  const {
    data: tasks,
    loading,
  } = useTasks();
  const task = tasks.find((item) => item.id === params.id);
  const informationItems: Array<{
    label: string;
    value: string | null;
    icon: LucideIcon;
  }> = task
    ? [
      {
        label: "Priorität",
        value: task.priority,
        icon: CalendarClock,
      },
      {
        label: "Verantwortlich",
        value: task.assignedTo,
        icon: UserRound,
      },
      {
        label: "Ort",
        value: task.location,
        icon: MapPin,
      },
      {
        label: "Fällig",
        value: formatDateTime(task.dueAt),
        icon: CalendarClock,
      },
    ]
    : [];

  return (
    <AppShell
      title="Aufgabe"
      subtitle="Details, Zuständigkeit und Status"
    >
      {loading ? (
        <div className="space-y-8">
          <Skeleton className="h-56" />
          <Skeleton className="h-64" />
        </div>
      ) : task ? (
        <div className="space-y-8">
          <Card>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                {task.priority && <Badge variant="accent">{task.priority}</Badge>}
                <h2 className="mt-5 text-3xl font-black tracking-tight">
                  {task.title}
                </h2>
                {task.description && (
                  <p className="mt-4 max-w-2xl text-text-muted">
                    {task.description}
                  </p>
                )}
              </div>

              {task.status && <Badge>{task.status}</Badge>}
            </div>
          </Card>

          <Section title="Informationen">
            <Card className="space-y-5">
              {informationItems.map(({ label, value, icon: Icon }) => (
                <div
                  className="flex items-center justify-between gap-4 border-b border-border-soft pb-4 last:border-b-0 last:pb-0"
                  key={label}
                >
                  <div className="flex items-center gap-3 text-text-muted">
                    <Icon size={18} />
                    <span>{label}</span>
                  </div>
                  <span className="font-semibold">
                    {value ?? "Nicht gesetzt"}
                  </span>
                </div>
              ))}
            </Card>
          </Section>
        </div>
      ) : (
        <EmptyState
          text="Diese Aufgabe wurde in Supabase nicht gefunden."
          title="Aufgabe nicht gefunden"
        />
      )}
    </AppShell>
  );
}
