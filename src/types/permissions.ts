export const permissionKeys = [
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
] as const;

export type PermissionKey = (typeof permissionKeys)[number];

export type PermissionSet = Set<PermissionKey>;

export type PermissionRecord = {
  key: PermissionKey;
  label: string;
  module: string;
};

export type RoleRecord = {
  id: string;
  name: string;
  description: string | null;
  system: boolean;
};
