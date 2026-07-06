"use client";

import { AlertTriangle, Boxes, PackageCheck, Search } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { useInventoryItems } from "@/hooks/usePlatformData";

export default function InventoryPage() {
  const {
    data: inventory,
    loading,
  } = useInventoryItems();

  const warningCount = inventory.filter((item) => (
    item.minimumStock !== null && item.quantity <= item.minimumStock
  )).length;
  const readyPercent = inventory.length === 0
    ? 0
    : Math.round(((inventory.length - warningCount) / inventory.length) * 100);

  return (
    <AppShell
      title="Inventar"
      subtitle="Material, Bestand und Warnungen"
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Boxes className="text-text-secondary" size={24} />
            <p className="mt-6 text-4xl font-black">{inventory.length}</p>
            <p className="mt-1 text-sm text-text-muted">Positionen</p>
          </Card>
          <Card>
            <AlertTriangle className="text-red-200" size={24} />
            <p className="mt-6 text-4xl font-black">{warningCount}</p>
            <p className="mt-1 text-sm text-text-muted">Bestandswarnungen</p>
          </Card>
          <Card>
            <PackageCheck className="text-text-secondary" size={24} />
            <p className="mt-6 text-4xl font-black">{readyPercent}%</p>
            <p className="mt-1 text-sm text-text-muted">Einsatzbereit</p>
          </Card>
        </div>

        <Section
          subtitle="Kategorien, Mengen und Warnungen in einem ruhigen Operations-Layout."
          title="Bestand"
        >
          <Input
            className="mb-4 w-full lg:w-96"
            icon={<Search size={18} />}
            placeholder="Inventar suchen..."
            type="search"
          />

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="h-56" />
              <Skeleton className="h-56" />
              <Skeleton className="h-56" />
            </div>
          ) : inventory.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {inventory.map((item) => {
                const isLowStock =
                  item.minimumStock !== null && item.quantity <= item.minimumStock;

                return (
                  <Card key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-black">{item.name}</h2>
                        {item.category && (
                          <p className="mt-2 text-sm text-text-muted">
                            {item.category}
                          </p>
                        )}
                      </div>
                      <Badge variant={isLowStock ? "warning" : "success"}>
                        {isLowStock ? "Warnung" : "OK"}
                      </Badge>
                    </div>
                    <p className="mt-8 text-4xl font-black">
                      {item.quantity}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">
                      aktuell verfügbar
                    </p>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState
              text="In Supabase sind noch keine Inventarpositionen vorhanden."
              title="Kein Inventar"
            />
          )}
        </Section>
      </div>
    </AppShell>
  );
}
