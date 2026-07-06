import Card from "@/components/ui/Card";

type EventProgressProps = {
  eventName: string;
  progress: number;
};

export default function EventProgress({
  eventName,
  progress,
}: EventProgressProps) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-text-secondary">
            {eventName}
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Event Readiness
          </h2>
        </div>
        <span className="text-3xl font-black">
          {progress}%
        </span>
      </div>

      <progress
        className="mt-6 h-3 w-full overflow-hidden rounded-full accent-accent"
        max={100}
        value={progress}
      />

      <p className="mt-3 text-sm text-text-muted">
        Technik, Crew und Dokumente werden laufend synchronisiert.
      </p>
    </Card>
  );
}
