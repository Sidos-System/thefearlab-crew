"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useEvents } from "@/hooks/usePlatformData";
import { formatDate, formatDateTime } from "@/lib/format";

export default function SchedulePage() {
  const {
    data: events,
    loading,
  } = useEvents();
  const activeEvent = events[0];

  return (
    <AppShell
      title="Zeitplan"
      subtitle="Schichten, Briefings und Tagesplanung"
    >
      {loading ? (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Skeleton className="h-56" />
          <div className="space-y-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="accent">Aktiv</Badge>
                <h2 className="mt-4 text-3xl font-black">
                  {activeEvent.name}
                </h2>
                <p className="mt-2 text-text-muted">
                  {formatDate(activeEvent.startsAt)}
                </p>
              </div>
              <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
                <CalendarDays size={22} />
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="flex items-center gap-4"
                padding="sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-accent/12 text-red-100">
                  <Clock3 size={20} />
                </div>
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p className="text-sm text-text-muted">
                    {formatDateTime(event.startsAt)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          text="In Supabase sind noch keine Events vorhanden."
          title="Kein Zeitplan"
        />
      )}
    </AppShell>
  );
}
