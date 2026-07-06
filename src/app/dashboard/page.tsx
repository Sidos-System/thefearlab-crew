"use client";

import {
  CalendarDays,
  ClipboardList,
  FileText,
  MessageCircle,
  Package,
  Radio,
  Siren,
  Users,
} from "lucide-react";
import ActivityCard from "@/components/dashboard/ActivityCard";
import CrewStatusCard from "@/components/dashboard/CrewStatusCard";
import DashboardCard from "@/components/dashboard/DashboardCard";
import EventProgress from "@/components/dashboard/EventProgress";
import HeroCard from "@/components/dashboard/HeroCard";
import SectionTitle from "@/components/dashboard/SectionTitle";
import TaskCard from "@/components/dashboard/TaskCard";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import useDashboard from "@/hooks/useDashboard";
import {
  useChatMessages,
  useEvents,
  useProfiles,
  useTasks,
} from "@/hooks/usePlatformData";
import useProfile from "@/hooks/useProfile";
import { formatDate, formatDateTime } from "@/lib/format";

export default function DashboardPage() {
  const { profile, loading: profileLoading } = useProfile();
  const stats = useDashboard();
  const { data: tasks, loading: tasksLoading } = useTasks();
  const { data: profiles, loading: profilesLoading } = useProfiles();
  const { data: events, loading: eventsLoading } = useEvents();
  const { data: messages, loading: messagesLoading } = useChatMessages();

  const activeEvent = events[0];
  const completedTasks = tasks.filter((task) => task.status === "Erledigt").length;
  const readiness = tasks.length > 0
    ? Math.round((completedTasks / tasks.length) * 100)
    : null;
  const daysUntilEvent = getDaysUntil(activeEvent?.startsAt ?? null);
  const displayName = profile?.full_name ?? "Crew";

  const statCards = [
    {
      title: "Crew online",
      value: stats.teamOnline,
      subtitle: "Aktive Teammitglieder",
      icon: <Users size={24} />,
    },
    {
      title: "Aufgaben",
      value: stats.tasks,
      subtitle: "Offene Einsätze",
      icon: <ClipboardList size={24} />,
    },
    {
      title: "Dokumente",
      value: stats.documents,
      subtitle: "Freigegebene Dateien",
      icon: <FileText size={24} />,
    },
    {
      title: "Notfälle",
      value: stats.emergencies,
      subtitle: "Aktive Meldungen",
      icon: <Siren size={24} />,
    },
    {
      title: "Inventar",
      value: stats.inventory,
      subtitle: "Materialpositionen",
      icon: <Package size={24} />,
    },
  ];

  return (
    <AppShell
      title="Dashboard"
      subtitle={profileLoading ? "Lade Profil..." : `Willkommen zurück, ${displayName}`}
    >
      <div className="space-y-8 sm:space-y-10">
        <HeroCard
          name={displayName}
          eventName={activeEvent?.name}
          daysUntilEvent={daysUntilEvent}
          readiness={readiness}
        />

        <section>
          <SectionTitle
            subtitle="Live-Überblick über Crew, Aufgaben und Material."
            title="Statistiken"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {statCards.map((card) => (
              <DashboardCard
                key={card.title}
                {...card}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <div>
            <SectionTitle
              subtitle="Priorisierte Arbeit aus Supabase."
              title="Aufgaben"
            />

            {tasksLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            ) : tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.slice(0, 3).map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    priority={task.priority}
                    location={task.location}
                    time={formatDateTime(task.dueAt)}
                    status={task.status}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                text="In Supabase sind noch keine Aufgaben vorhanden."
                title="Keine Aufgaben"
              />
            )}
          </div>

          <div>
            <SectionTitle
              subtitle="Aktuelle Einsatzbereitschaft."
              title="Crew Status"
            />
            {profilesLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            ) : profiles.length > 0 ? (
              <div className="space-y-3">
                {profiles.slice(0, 3).map((crewProfile) => (
                  <CrewStatusCard
                    key={crewProfile.id}
                    name={crewProfile.fullName}
                    role={crewProfile.role}
                    status={crewProfile.status}
                    online={crewProfile.online}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                text="In Supabase sind noch keine Crewprofile vorhanden."
                title="Keine Crewprofile"
              />
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.1fr_0.95fr]">
          <div>
            <SectionTitle
              subtitle="Fortschritt aus abgeschlossenen Aufgaben."
              title="Event"
            />
            {activeEvent && typeof readiness === "number" ? (
              <EventProgress
                eventName={activeEvent.name}
                progress={readiness}
              />
            ) : (
              <EmptyState
                text="Für Event Readiness werden ein Event und Aufgaben in Supabase benötigt."
                title="Keine Readiness"
              />
            )}
          </div>

          <div>
            <SectionTitle
              subtitle="Letzte Chat-Aktivität aus Supabase."
              title="Aktivität"
            />
            <Card
              className="space-y-4"
              padding="sm"
            >
              {messagesLoading ? (
                <>
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                </>
              ) : messages.length > 0 ? (
                messages.slice(0, 3).map((message) => (
                  <ActivityCard
                    key={message.id}
                    icon={MessageCircle}
                    person={message.authorName}
                    time={formatDateTime(message.createdAt)}
                    title={message.body}
                  />
                ))
              ) : (
                <EmptyState
                  text="In Supabase sind noch keine Chatnachrichten vorhanden."
                  title="Keine Aktivität"
                />
              )}
            </Card>
          </div>

          <div>
            <SectionTitle
              subtitle="Nächstes Event aus Supabase."
              title="Kalender"
            />
            <Card className="space-y-4">
              {eventsLoading ? (
                <Skeleton className="h-44" />
              ) : activeEvent ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">
                        {formatDate(activeEvent.startsAt)}
                      </p>
                      <h3 className="mt-1 text-2xl font-black">
                        {activeEvent.name}
                      </h3>
                    </div>
                    <div className="rounded-[18px] bg-accent/12 p-3 text-red-100">
                      <CalendarDays size={22} />
                    </div>
                  </div>
                  <Badge variant="accent">
                    {typeof daysUntilEvent === "number"
                      ? `${daysUntilEvent} Tage`
                      : "Aktiv"}
                  </Badge>
                </>
              ) : (
                <EmptyState
                  text="In Supabase sind noch keine Events vorhanden."
                  title="Kein Event"
                />
              )}
            </Card>
          </div>
        </section>

        <section>
          <SectionTitle
            subtitle="Kommende Ereignisse aus der Event-Tabelle."
            title="Upcoming Events"
          />
          {eventsLoading ? (
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
            </div>
          ) : events.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {events.slice(0, 3).map((event) => (
                <Card
                  key={event.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <Badge variant="accent">{event.year ?? "Event"}</Badge>
                    <p className="mt-4 font-semibold">
                      {event.name}
                    </p>
                    <p className="mt-2 text-sm text-text-muted">
                      {formatDateTime(event.startsAt)}
                    </p>
                  </div>
                  <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
                    <Radio size={20} />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              text="In Supabase sind noch keine Events vorhanden."
              title="Keine Events"
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}

function getDaysUntil(value: string | null) {
  if (!value) return null;

  const eventDate = new Date(value);

  if (Number.isNaN(eventDate.getTime())) {
    return null;
  }

  const diff = eventDate.getTime() - Date.now();

  return Math.max(0, Math.ceil(diff / 86_400_000));
}
