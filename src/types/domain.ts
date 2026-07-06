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

export type DashboardStats = {
  teamOnline: number;
  tasks: number;
  documents: number;
  emergencies: number;
  inventory: number;
};
