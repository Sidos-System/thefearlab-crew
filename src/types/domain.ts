export type UnknownRecord = Record<string, unknown>;

export type PresenceStatus =
  | "online"
  | "busy"
  | "on_duty"
  | "break"
  | "offline"
  | "sick"
  | "vacation";

export type PlatformProfile = {
  id: string;
  fullName: string;
  role: string;
  status: PresenceStatus;
  online: boolean;
  avatarUrl: string | null;
};

export type PlatformTask = {
  id: string;
  title: string;
  description: string | null;
  priority: string | null;
  status: string | null;
  location: string | null;
  dueAt: string | null;
  assignedTo: string | null;
};

export type PlatformDocument = {
  id: string;
  title: string;
  category: string | null;
  version: string | null;
  fileUrl: string | null;
  storagePath: string | null;
  updatedAt: string | null;
};

export type PlatformInventoryItem = {
  id: string;
  name: string;
  category: string | null;
  quantity: number;
  minimumStock: number | null;
  imageUrl: string | null;
};

export type PlatformChatChannel = {
  id: string;
  name: string;
};

export type PlatformChatMessage = {
  id: string;
  channelId: string | null;
  authorName: string;
  body: string;
  createdAt: string | null;
};

export type PlatformEvent = {
  id: string;
  name: string;
  year: number | null;
  startsAt: string | null;
  endsAt: string | null;
};

export type PlatformEmergencyLocation = {
  id: string;
  name: string;
  description: string | null;
};

export type PlatformEmergency = {
  id: string;
  locationId: string | null;
  locationName: string | null;
  reporterId: string | null;
  status: string;
  note: string | null;
  active: boolean;
  createdAt: string | null;
};

export type PlatformAuditLog = {
  id: string;
  actorId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  createdAt: string | null;
};

export type DashboardStats = {
  teamOnline: number;
  tasks: number;
  documents: number;
  emergencies: number;
  inventory: number;
};
