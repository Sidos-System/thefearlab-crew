"use client";

import AppShell from "@/components/layout/AppShell";
import PermissionGate from "@/components/auth/PermissionGate";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import TeamSearch from "@/components/team/TeamSearch";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useProfiles } from "@/hooks/usePlatformData";

export default function TeamPage() {
  const {
    data: profiles,
    loading,
  } = useProfiles();

  return (
    <AppShell
      title="Team"
      subtitle="Crewverwaltung"
    >
      <PermissionGate
        fallback={(
          <EmptyState
            text="Dein Account besitzt keine Berechtigung für die Crewverwaltung."
            title="Kein Zugriff"
          />
        )}
        permission="crew.read"
      >
        <div className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <TeamSearch />
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Skeleton className="h-52" />
            <Skeleton className="h-52" />
            <Skeleton className="h-52" />
          </div>
        ) : profiles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => (
              <TeamMemberCard
                key={profile.id}
                name={profile.fullName}
                role={profile.role}
                status={profile.status}
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
      </PermissionGate>
    </AppShell>
  );
}
