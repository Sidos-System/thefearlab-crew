import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function TestPage() {
  return (
    <AppShell
      title="Systemtest"
      subtitle="Interne Prüfseite für die Crew Platform"
    >
      <Card>
        <Badge variant="success">Bereit</Badge>
        <h2 className="mt-5 text-2xl font-black">Design-System aktiv</h2>
        <p className="mt-2 text-text-muted">
          Diese Route nutzt die gleiche Shell und Komponentenbasis wie der Rest
          der Plattform.
        </p>
      </Card>
    </AppShell>
  );
}
