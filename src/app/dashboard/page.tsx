"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import AppShell from "@/components/layout/AppShell";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ProfileCard from "@/components/profile/ProfileCard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <AppShell
        title="Dashboard"
        subtitle="Willkommen zurück."
      >
        <ProfileCard
          name="Maurice"
          role="Administrator"
          status="Einsatzbereit"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Team online"
            value="--"
          />

          <DashboardCard
            title="Aufgaben"
            value="--"
          />

          <DashboardCard
            title="Dokumente"
            value="--"
          />

          <DashboardCard
            title="Notfälle"
            value="0"
          />

        </div>

      </AppShell>
    </AuthGuard>
  );
}