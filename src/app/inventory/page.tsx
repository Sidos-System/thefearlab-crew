"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle, Boxes, PackageCheck, Plus, Search, Trash2 } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import PermissionGate from "@/components/auth/PermissionGate";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Dialog from "@/components/ui/Dialog";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { useInventoryItems } from "@/hooks/usePlatformData";
import usePermissions from "@/hooks/usePermissions";
import {
  createInventoryItem,
  deleteInventoryItem,
} from "@/services/platform";

export default function InventoryPage() {
  const {
    data: inventory,
    loading,
    refresh,
  } = useInventoryItems();
  const { can } = usePermissions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [minimumStock, setMinimumStock] = useState("0");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const warningCount = inventory.filter((item) => (
    item.minimumStock !== null && item.quantity <= item.minimumStock
  )).length;
  const readyPercent = inventory.length === 0
    ? 0
    : Math.round(((inventory.length - warningCount) / inventory.length) * 100);

  async function submitItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const result = await createInventoryItem({
      name,
      category,
      quantity: Number(quantity),
      minimumStock: Number(minimumStock),
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Inventarposition konnte nicht erstellt werden.");
      return;
    }

    setDialogOpen(false);
    setName("");
    setCategory("");
    setQuantity("0");
    setMinimumStock("0");
    refresh();
  }

  async function removeItem(id: string) {
    await deleteInventoryItem(id);
    refresh();
  }

  return (
    <AppShell
      title="Inventar"
      subtitle="Material, Bestand und Warnungen"
    >
      <PermissionGate
        fallback={(
          <EmptyState
            text="Dein Account besitzt keine Berechtigung für Inventar."
            title="Kein Zugriff"
          />
        )}
        permission="inventory.read"
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
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <Input
              className="w-full lg:w-96"
              icon={<Search size={18} />}
              placeholder="Inventar suchen..."
              type="search"
            />
            {can("inventory.edit") && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus size={18} />
                Position anlegen
              </Button>
            )}
          </div>

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
                    {can("inventory.edit") && (
                      <Button
                        className="mt-6"
                        onClick={() => removeItem(item.id)}
                        variant="secondary"
                      >
                        <Trash2 size={17} />
                        Löschen
                      </Button>
                    )}
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

        <Dialog
          description="Neue Inventarposition direkt in Supabase anlegen."
          onClose={() => setDialogOpen(false)}
          open={dialogOpen}
          title="Inventarposition"
        >
          <form
            className="space-y-4"
            onSubmit={submitItem}
          >
            <Input
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              required
              value={name}
            />
            <Input
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Kategorie"
              value={category}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                min={0}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="Menge"
                required
                type="number"
                value={quantity}
              />
              <Input
                min={0}
                onChange={(event) => setMinimumStock(event.target.value)}
                placeholder="Mindestbestand"
                required
                type="number"
                value={minimumStock}
              />
            </div>

            {error && (
              <div className="rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
                {error}
              </div>
            )}

            <Button
              disabled={saving}
              type="submit"
            >
              {saving ? "Speichern..." : "Speichern"}
            </Button>
          </form>
        </Dialog>
        </div>
      </PermissionGate>
    </AppShell>
  );
}
