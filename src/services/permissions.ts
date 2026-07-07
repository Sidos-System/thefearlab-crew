import { supabase } from "@/lib/supabase";
import type {
  PermissionKey,
  PermissionRecord,
  RoleRecord,
} from "@/types/permissions";

type PermissionRpcRow = {
  permission_key: string;
};

export async function getCurrentUserPermissions() {
  const { data, error } = await supabase.rpc("get_my_permissions");

  if (error || !data) {
    return [];
  }

  return (data as PermissionRpcRow[])
    .map((row) => row.permission_key)
    .filter(isPermissionKey);
}

export async function getPermissions() {
  const { data, error } = await supabase
    .from("permissions")
    .select("key,label,module")
    .order("module")
    .order("key");

  if (error || !data) {
    return [];
  }

  return data
    .filter((row) => isPermissionKey(row.key))
    .map((row) => ({
      key: row.key,
      label: row.label,
      module: row.module,
    })) as PermissionRecord[];
}

export async function getRoles() {
  const { data, error } = await supabase
    .from("roles")
    .select("id,name,description,system")
    .order("name");

  if (error || !data) {
    return [];
  }

  return data as RoleRecord[];
}

export async function createRole(input: {
  name: string;
  description?: string;
  permissions: PermissionKey[];
}) {
  const { data, error } = await supabase
    .from("roles")
    .insert({
      name: input.name,
      description: input.description ?? null,
      system: false,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      ok: false,
      error: error?.message ?? "Rolle konnte nicht erstellt werden.",
    };
  }

  if (input.permissions.length > 0) {
    const { error: permissionError } = await supabase
      .from("role_permissions")
      .insert(input.permissions.map((permission) => ({
        role_id: data.id,
        permission_key: permission,
      })));

    if (permissionError) {
      return {
        ok: false,
        error: permissionError.message,
      };
    }
  }

  return {
    ok: true,
    error: null,
  };
}

export function isPermissionKey(value: string): value is PermissionKey {
  return [
    "admin.access",
    "roles.manage",
    "users.manage",
    "events.manage",
    "crew.read",
    "crew.edit",
    "tasks.read",
    "tasks.create",
    "tasks.edit",
    "tasks.delete",
    "chat.read",
    "chat.write",
    "inventory.read",
    "inventory.edit",
    "documents.read",
    "documents.upload",
    "documents.delete",
    "budget.view",
    "budget.edit",
    "emergency.create",
    "emergency.manage",
    "settings.manage",
  ].includes(value);
}
