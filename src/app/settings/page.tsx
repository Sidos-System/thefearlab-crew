import { Bell, Shield, UserCog } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

const settings = [
  {
    title: "Profil",
    description: "Name, Rolle und persönliche Crew-Daten",
    icon: UserCog,
  },
  {
    title: "Benachrichtigungen",
    description: "Push, E-Mail und Event-Erinnerungen",
    icon: Bell,
  },
  {
    title: "Sicherheit",
    description: "Session, Zugriff und Berechtigungen",
    icon: Shield,
  },
];

export default function SettingsPage() {
  return (
    <AppShell
      title="Einstellungen"
      subtitle="Persönliche Einstellungen und Plattformoptionen"
    >
      <Section
        subtitle="Diese Oberfläche nutzt bereits die finalisierte Design-System-Basis."
        title="Account"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {settings.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
                    <Icon size={22} />
                  </div>
                  <Badge>Phase 2</Badge>
                </div>
                <h2 className="mt-6 text-xl font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>
    </AppShell>
  );
}
