import AppShell from "@/components/layout/AppShell";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import TeamSearch from "@/components/team/TeamSearch";
import AddMemberButton from "@/components/team/AddMemberButton";

export default function TeamPage() {
  return (
    <AppShell
      title="Team"
      subtitle="Crewverwaltung"
    >
      <div className="space-y-8">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <TeamSearch />

          <AddMemberButton />

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <TeamMemberCard
            name="Maurice"
            role="Administrator"
            status="Einsatzbereit"
          />

          <TeamMemberCard
            name="Chris"
            role="Security"
            status="Pause"
          />

          <TeamMemberCard
            name="Malik"
            role="Technik"
            status="Einsatzbereit"
          />

        </div>

      </div>
    </AppShell>
  );
}