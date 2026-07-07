"use client";

import { FormEvent, useState } from "react";
import { Siren } from "lucide-react";
import PermissionGate from "@/components/auth/PermissionGate";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import EmptyState from "@/components/ui/EmptyState";
import Select from "@/components/ui/Select";
import { useEmergencyLocations } from "@/hooks/usePlatformData";
import { createEmergencyAlert } from "@/services/platform";

export default function EmergencyButton() {
  const [open, setOpen] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    data: locations,
    loading: locationsLoading,
  } = useEmergencyLocations();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!locationId) {
      setError("Bitte wähle einen Ort aus.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await createEmergencyAlert({
      locationId,
      note,
    });

    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? "Notruf konnte nicht gesendet werden.");
      return;
    }

    setOpen(false);
    setLocationId("");
    setNote("");
  }

  return (
    <PermissionGate permission="emergency.create">
      <Button
        aria-label="Notruf öffnen"
        className="fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full shadow-[0_18px_44px_rgba(224,32,42,0.45)] lg:hidden"
        onClick={() => setOpen(true)}
        size="icon"
      >
        <Siren size={22} />
      </Button>

      <Dialog
        description="Wähle den administrativ konfigurierten Ort und sende den Notruf an die Einsatzleitung."
        onClose={() => setOpen(false)}
        open={open}
        title="Notruf senden"
      >
        {locationsLoading ? (
          <p className="text-sm text-text-muted">Lade Notruforte...</p>
        ) : locations.length > 0 ? (
          <form
            className="space-y-4"
            onSubmit={submit}
          >
            <Select
              onChange={(event) => setLocationId(event.target.value)}
              required
              value={locationId}
            >
              <option value="">Ort auswählen</option>
              {locations.map((location) => (
                <option
                  key={location.id}
                  value={location.id}
                >
                  {location.name}
                </option>
              ))}
            </Select>

            <label className="block">
              <span className="text-sm font-semibold text-text-secondary">
                Hinweis
              </span>
              <textarea
                className="mt-2 min-h-28 w-full rounded-[18px] border border-border-soft bg-surface-1 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-text-muted focus:border-accent/60"
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optionaler Hinweis für die Einsatzleitung"
                value={note}
              />
            </label>

            {error && (
              <div className="rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
                {error}
              </div>
            )}

            <Button
              className="w-full"
              disabled={loading}
              type="submit"
            >
              <Siren size={18} />
              {loading ? "Sende Notruf..." : "Notruf senden"}
            </Button>
          </form>
        ) : (
          <EmptyState
            text="Es sind noch keine Notruforte in Supabase konfiguriert."
            title="Keine Notruforte"
          />
        )}
      </Dialog>
    </PermissionGate>
  );
}
