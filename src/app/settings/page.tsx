"use client";

import { FormEvent, useState } from "react";
import { Save, Shield, UserCog } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Select from "@/components/ui/Select";
import Skeleton from "@/components/ui/Skeleton";
import useProfile from "@/hooks/useProfile";
import { updateCurrentProfile } from "@/services/profile";
import type { Profile } from "@/types/profile";

export default function SettingsPage() {
  const {
    profile,
    loading,
  } = useProfile();
  return (
    <AppShell
      title="Einstellungen"
      subtitle="Persönliche Einstellungen und Zugriff"
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Section
          subtitle="Diese Daten werden direkt in Supabase gespeichert."
          title="Profil"
        >
          {loading ? (
            <Skeleton className="h-80" />
          ) : profile ? (
            <ProfileSettingsForm
              key={profile.id}
              profile={profile}
            />
          ) : (
            <Card interactive={false}>
              Profil konnte nicht geladen werden.
            </Card>
          )}
        </Section>

        <Section
          subtitle="Rollen und Berechtigungen werden im Admin-Center verwaltet."
          title="Zugriff"
        >
          <Card>
            <div className="flex items-center gap-4">
              <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
                <Shield size={22} />
              </div>
              <div>
                <p className="font-bold">{profile?.role ?? "Crew"}</p>
                <p className="mt-1 text-sm text-text-muted">
                  Aktuelle Rolle deines Accounts
                </p>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </AppShell>
  );
}

function ProfileSettingsForm({
  profile,
}: {
  profile: Profile;
}) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [status, setStatus] = useState(profile.online ? "online" : "offline");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const result = await updateCurrentProfile({
      fullName,
      phone,
      status,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Profil konnte nicht gespeichert werden.");
      return;
    }

    setMessage("Profil gespeichert.");
  }

  return (
    <Card>
      <form
        className="space-y-4"
        onSubmit={submit}
      >
        <Input
          icon={<UserCog size={18} />}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Name"
          required
          value={fullName}
        />
        <Input
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Telefon"
          type="tel"
          value={phone}
        />
        <Select
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        >
          <option value="online">Online</option>
          <option value="busy">Beschäftigt</option>
          <option value="break">Pause</option>
          <option value="offline">Offline</option>
        </Select>

        {message && (
          <div className="rounded-[18px] border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
            {error}
          </div>
        )}

        <Button
          disabled={saving}
          type="submit"
        >
          <Save size={18} />
          {saving ? "Speichern..." : "Speichern"}
        </Button>
      </form>
    </Card>
  );
}
