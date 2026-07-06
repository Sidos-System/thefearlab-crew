import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";

type HeroCardProps = {
  name: string;
  eventName?: string;
  daysUntilEvent?: number | null;
  readiness?: number | null;
};

export default function HeroCard({
  name,
  eventName,
  daysUntilEvent,
  readiness,
}: HeroCardProps) {
  return (
    <Card
      className="relative min-h-[460px] overflow-hidden rounded-[28px] bg-surface-1 p-0 sm:min-h-[420px]"
      padding="none"
    >
      <Image
        alt=""
        className="object-cover"
        fill
        fetchPriority="high"
        sizes="(max-width: 1024px) 100vw, 80vw"
        src="/crew-platform-hero.png"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,26,31,0.98)_0%,rgba(24,26,31,0.88)_42%,rgba(24,26,31,0.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/70 to-transparent" />

      <div className="relative flex min-h-[460px] flex-col justify-between gap-10 p-6 sm:min-h-[420px] sm:p-10 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase text-red-100">
            <ShieldCheck size={14} />
            {eventName ?? "Live Operations"}
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Willkommen zurück, {name}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Plane Crew, Aufgaben und Einsatzbereitschaft in einer ruhigen,
            schnellen Kommandozentrale für das gesamte Event.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:w-[380px] xl:grid-cols-1">
          {typeof readiness === "number" && (
            <div className="rounded-[24px] border border-white/10 bg-surface-1/82 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-text-secondary">
                    Event-Fortschritt
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    {readiness}% bereit
                  </p>
                </div>
                <ProgressRing
                  label="Event-Fortschritt"
                  value={readiness}
                />
              </div>
            </div>
          )}

          <div className="rounded-[24px] border border-white/10 bg-surface-1/82 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-accent/12 text-red-100">
                {typeof daysUntilEvent === "number" ? (
                  <Clock3 size={22} />
                ) : (
                  <CalendarDays size={22} />
                )}
              </div>
              <div>
                <p className="text-sm text-text-secondary">
                  {typeof daysUntilEvent === "number" ? "Countdown" : "Event"}
                </p>
                <p className="mt-1 text-2xl font-black">
                  {typeof daysUntilEvent === "number"
                    ? `${daysUntilEvent} Tage`
                    : eventName ?? "Nicht gesetzt"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
