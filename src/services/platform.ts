import { supabase } from "@/lib/supabase";
import {
  readBoolean,
  readNullableString,
  readNumber,
  readString,
} from "@/lib/record";
import type {
  PlatformChatChannel,
  PlatformChatMessage,
  PlatformDocument,
  PlatformEvent,
  PlatformInventoryItem,
  PlatformProfile,
  PlatformTask,
  PresenceStatus,
  UnknownRecord,
} from "@/types/domain";

type TableName =
  | "profiles"
  | "tasks"
  | "documents"
  | "inventory"
  | "emergencies"
  | "chat_channels"
  | "chat_messages"
  | "events";

async function getRows(table: TableName, limit = 50) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data as UnknownRecord[];
}

export async function getProfiles() {
  const rows = await getRows("profiles", 100);

  return rows.map<PlatformProfile>((row) => {
    const rawStatus = readString(row, ["presence_status", "status"], "offline");
    const status = normalizePresence(rawStatus);

    return {
      id: readString(row, ["id"]),
      fullName: readString(row, ["full_name", "name", "display_name"], "Crew"),
      role: readString(row, ["role", "role_name"], "Crew"),
      status,
      online: readBoolean(row, ["online", "is_online"], status === "online"),
      avatarUrl: readNullableString(row, ["avatar_url", "avatarUrl"]),
    };
  }).filter((profile) => profile.id.length > 0);
}

export async function getTasks() {
  const rows = await getRows("tasks", 100);

  return rows.map<PlatformTask>((row) => ({
    id: readString(row, ["id"]),
    title: readString(row, ["title", "name"]),
    description: readNullableString(row, ["description", "details"]),
    priority: readNullableString(row, ["priority"]),
    status: readNullableString(row, ["status"]),
    location: readNullableString(row, ["location"]),
    dueAt: readNullableString(row, ["due_at", "dueDate", "due_date"]),
    assignedTo: readNullableString(row, ["assigned_to", "assignee_name"]),
  })).filter((task) => task.id.length > 0 && task.title.length > 0);
}

export async function getDocuments() {
  const rows = await getRows("documents", 100);

  return rows.map<PlatformDocument>((row) => ({
    id: readString(row, ["id"]),
    title: readString(row, ["title", "name", "filename"]),
    category: readNullableString(row, ["category"]),
    version: readNullableString(row, ["version"]),
    fileUrl: readNullableString(row, ["file_url", "url", "public_url"]),
    updatedAt: readNullableString(row, ["updated_at", "created_at"]),
  })).filter((document) => document.id.length > 0 && document.title.length > 0);
}

export async function getInventoryItems() {
  const rows = await getRows("inventory", 100);

  return rows.map<PlatformInventoryItem>((row) => ({
    id: readString(row, ["id"]),
    name: readString(row, ["name", "title"]),
    category: readNullableString(row, ["category"]),
    quantity: readNumber(row, ["quantity", "stock", "count"], 0),
    minimumStock: readNumber(row, ["minimum_stock", "min_stock"], 0),
    imageUrl: readNullableString(row, ["image_url", "imageUrl"]),
  })).filter((item) => item.id.length > 0 && item.name.length > 0);
}

export async function getChatChannels() {
  const rows = await getRows("chat_channels", 100);

  return rows.map<PlatformChatChannel>((row) => ({
    id: readString(row, ["id"]),
    name: readString(row, ["name", "title"]),
  })).filter((channel) => channel.id.length > 0 && channel.name.length > 0);
}

export async function getChatMessages() {
  const rows = await getRows("chat_messages", 100);

  return rows.map<PlatformChatMessage>((row) => ({
    id: readString(row, ["id"]),
    channelId: readNullableString(row, ["channel_id", "channelId"]),
    authorName: readString(row, ["author_name", "sender_name", "user_name"], "Crew"),
    body: readString(row, ["body", "message", "content"]),
    createdAt: readNullableString(row, ["created_at"]),
  })).filter((message) => message.id.length > 0 && message.body.length > 0);
}

export async function getEvents() {
  const rows = await getRows("events", 100);

  return rows.map<PlatformEvent>((row) => ({
    id: readString(row, ["id"]),
    name: readString(row, ["name", "title"]),
    year: readNumber(row, ["year"], new Date().getFullYear()),
    startsAt: readNullableString(row, ["starts_at", "start_date", "date"]),
    endsAt: readNullableString(row, ["ends_at", "end_date"]),
  })).filter((event) => event.id.length > 0 && event.name.length > 0);
}

function normalizePresence(status: string): PresenceStatus {
  const normalized = status.toLowerCase();

  if (["online", "einsatzbereit"].includes(normalized)) return "online";
  if (["busy", "beschäftigt"].includes(normalized)) return "busy";
  if (["on_duty", "on duty", "dienst"].includes(normalized)) return "on_duty";
  if (["break", "pause"].includes(normalized)) return "break";
  if (["sick", "krank"].includes(normalized)) return "sick";
  if (["vacation", "urlaub"].includes(normalized)) return "vacation";

  return "offline";
}
