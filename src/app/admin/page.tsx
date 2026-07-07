"use client";

import { FormEvent, useState } from "react";
import {
  ClipboardList,
  Database,
  FileText,
  KeyRound,
  Package,
  Plus,
  ScrollText,
  Shield,
  Siren,
  Users,
} from "lucide-react";
import PermissionGate from "@/components/auth/PermissionGate";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import Table from "@/components/ui/Table";
import useRealtimeData from "@/hooks/useRealtimeData";
import {
  useDocuments,
  useEmergencies,
  useEvents,
  useInventoryItems,
  useProfiles,
  useTasks,
} from "@/hooks/usePlatformData";
import usePermissions from "@/hooks/usePermissions";
import { getAuditLogs } from "@/services/platform";
import {
  createRole,
  getPermissions,
  getRoles,
} from "@/services/permissions";
import type {
  PermissionKey,
  PermissionRecord,
  RoleRecord,
} from "@/types/permissions";

export default function AdminPage() {
  return (
    <AppShell
      title="Admin Center"
      subtitle="Benutzer, Rollen, Events und Systemmodule"
    >
      <PermissionGate permission="admin.access">
        <AdminContent />
      </PermissionGate>
    </AppShell>
  );
}

function AdminContent() {
  const { can } = usePermissions();
  const {
    data: roles,
    loading: rolesLoading,
    refresh: refreshRoles,
  } = useRealtimeData(getRoles, [], ["roles", "role_permissions"]);
  const {
    data: permissions,
    loading: permissionsLoading,
  } = useRealtimeData(getPermissions, [], ["permissions"]);
  const {
    data: auditLogs,
    loading: logsLoading,
  } = useRealtimeData(getAuditLogs, [], ["audit_logs"]);
  const { data: profiles } = useProfiles();
  const { data: tasks } = useTasks();
  const { data: inventory } = useInventoryItems();
  const { data: documents } = useDocuments();
  const { data: events } = useEvents();
  const { data: emergencies } = useEmergencies();

  const modules = [
    {
      title: "Benutzer",
      count: profiles.length,
      icon: Users,
    },
    {
      title: "Rollen",
      count: roles.length,
      icon: Shield,
    },
    {
      title: "Berechtigungen",
      count: permissions.length,
      icon: KeyRound,
    },
    {
      title: "Events",
      count: events.length,
      icon: Database,
    },
    {
      title: "Aufgaben",
      count: tasks.length,
      icon: ClipboardList,
    },
    {
      title: "Inventar",
      count: inventory.length,
      icon: Package,
    },
    {
      title: "Dokumente",
      count: documents.length,
      icon: FileText,
    },
    {
      title: "Notfälle",
      count: emergencies.filter((item) => item.active).length,
      icon: Siren,
    },
    {
      title: "Logs",
      count: auditLogs.length,
      icon: ScrollText,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Card key={module.title}>
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
                  <Icon size={22} />
                </div>
                <Badge>{module.count}</Badge>
              </div>
              <h2 className="mt-6 text-xl font-black">{module.title}</h2>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Section
          subtitle="Standard- und Custom-Rollen aus Supabase."
          title="Rollen"
        >
          {rolesLoading ? (
            <Skeleton className="h-80" />
          ) : roles.length > 0 ? (
            <Table<RoleRecord>
              columns={[
                {
                  key: "name",
                  header: "Name",
                  render: (role) => <span className="font-semibold text-white">{role.name}</span>,
                },
                {
                  key: "system",
                  header: "Typ",
                  render: (role) => (
                    <Badge variant={role.system ? "accent" : "default"}>
                      {role.system ? "System" : "Custom"}
                    </Badge>
                  ),
                },
              ]}
              getRowKey={(role) => role.id}
              rows={roles}
            />
          ) : (
            <EmptyState
              text="In Supabase sind noch keine Rollen vorhanden."
              title="Keine Rollen"
            />
          )}
        </Section>

        <Section
          subtitle="Neue Rollen werden direkt in Supabase angelegt."
          title="Rolle erstellen"
        >
          {can("roles.manage") ? (
            <CreateRoleForm
              onCreated={refreshRoles}
              permissions={permissions}
              permissionsLoading={permissionsLoading}
            />
          ) : (
            <EmptyState
              text="Dein Account besitzt keine Berechtigung zum Verwalten von Rollen."
              title="Kein Zugriff"
            />
          )}
        </Section>
      </section>

      <Section
        subtitle="Audit-Events aus Datenbank-Triggern."
        title="System Logs"
      >
        {logsLoading ? (
          <Skeleton className="h-72" />
        ) : auditLogs.length > 0 ? (
          <Table
            columns={[
              {
                key: "action",
                header: "Aktion",
                render: (log) => <Badge>{log.action}</Badge>,
              },
              {
                key: "entity",
                header: "Entität",
                render: (log) => log.entity,
              },
              {
                key: "created",
                header: "Zeit",
                render: (log) => log.createdAt ?? "Unbekannt",
              },
            ]}
            getRowKey={(log) => log.id}
            rows={auditLogs}
          />
        ) : (
          <EmptyState
            text="In Supabase sind noch keine Audit Logs vorhanden."
            title="Keine Logs"
          />
        )}
      </Section>
    </div>
  );
}

function CreateRoleForm({
  permissions,
  permissionsLoading,
  onCreated,
}: {
  permissions: PermissionRecord[];
  permissionsLoading: boolean;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionKey[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const result = await createRole({
      name,
      description,
      permissions: selectedPermissions,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Rolle konnte nicht erstellt werden.");
      return;
    }

    setName("");
    setDescription("");
    setSelectedPermissions([]);
    onCreated();
  }

  function togglePermission(permission: PermissionKey) {
    setSelectedPermissions((current) => (
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission]
    ));
  }

  return (
    <Card>
      <form
        className="space-y-4"
        onSubmit={submit}
      >
        <Input
          onChange={(event) => setName(event.target.value)}
          placeholder="Rollenname"
          required
          value={name}
        />
        <Input
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Beschreibung"
          value={description}
        />

        <div className="max-h-72 space-y-2 overflow-y-auto rounded-[18px] border border-border-soft bg-surface-1 p-3">
          {permissionsLoading ? (
            <p className="text-sm text-text-muted">Lade Berechtigungen...</p>
          ) : (
            permissions.map((permission) => (
              <label
                className="flex items-center justify-between gap-3 rounded-[14px] px-3 py-2 text-sm text-text-secondary transition duration-200 hover:bg-surface-3"
                key={permission.key}
              >
                <span>{permission.label}</span>
                <input
                  checked={selectedPermissions.includes(permission.key)}
                  onChange={() => togglePermission(permission.key)}
                  type="checkbox"
                />
              </label>
            ))
          )}
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
          <Plus size={18} />
          {saving ? "Erstelle Rolle..." : "Rolle erstellen"}
        </Button>
      </form>
    </Card>
  );
}
