import { supabase } from "@/lib/supabase";
import {
  readBoolean,
  readNullableString,
  readNumber,
  readString,
} from "@/lib/record";
import type {
  PlatformAuditLog,
  PlatformChatChannel,
  PlatformChatMessage,
  PlatformDocument,
  PlatformEmergency,
  PlatformEmergencyLocation,
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
  | "emergency_locations"
  | "audit_logs"
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
    storagePath: readNullableString(row, ["storage_path", "storagePath"]),
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

export async function getEmergencyLocations() {
  const rows = await getRows("emergency_locations", 100);

  return rows.map<PlatformEmergencyLocation>((row) => ({
    id: readString(row, ["id"]),
    name: readString(row, ["name"]),
    description: readNullableString(row, ["description"]),
  })).filter((location) => location.id.length > 0 && location.name.length > 0);
}

export async function getEmergencies() {
  const rows = await getRows("emergencies", 100);

  return rows.map<PlatformEmergency>((row) => ({
    id: readString(row, ["id"]),
    locationId: readNullableString(row, ["location_id", "locationId"]),
    locationName: readNullableString(row, ["location_name", "locationName"]),
    reporterId: readNullableString(row, ["reporter_id", "reporterId"]),
    status: readString(row, ["status"], "active"),
    note: readNullableString(row, ["note"]),
    active: readBoolean(row, ["active"], true),
    createdAt: readNullableString(row, ["created_at"]),
  })).filter((emergency) => emergency.id.length > 0);
}

export async function getAuditLogs() {
  const rows = await getRows("audit_logs", 100);

  return rows.map<PlatformAuditLog>((row) => ({
    id: readString(row, ["id"]),
    actorId: readNullableString(row, ["actor_id", "actorId"]),
    action: readString(row, ["action"]),
    entity: readString(row, ["entity"]),
    entityId: readNullableString(row, ["entity_id", "entityId"]),
    createdAt: readNullableString(row, ["created_at"]),
  })).filter((log) => log.id.length > 0);
}

export async function createTask(input: {
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  location?: string;
  dueAt?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description || null,
      priority: input.priority || null,
      status: input.status || "Offen",
      location: input.location || null,
      due_at: input.dueAt || null,
      created_by: user?.id ?? null,
      completed: input.status === "Erledigt",
    });

  return toServiceResult(error?.message);
}

export async function updateTask(id: string, input: {
  title?: string;
  description?: string | null;
  priority?: string | null;
  status?: string | null;
  location?: string | null;
  dueAt?: string | null;
}) {
  const status = input.status ?? undefined;
  const { error } = await supabase
    .from("tasks")
    .update({
      title: input.title,
      description: input.description,
      priority: input.priority,
      status,
      location: input.location,
      due_at: input.dueAt,
      completed: status ? status === "Erledigt" : undefined,
    })
    .eq("id", id);

  return toServiceResult(error?.message);
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  return toServiceResult(error?.message);
}

export async function sendChatMessage(input: {
  channelId: string;
  body: string;
  authorName: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("chat_messages")
    .insert({
      channel_id: input.channelId,
      author_id: user?.id ?? null,
      author_name: input.authorName,
      body: input.body,
    });

  return toServiceResult(error?.message);
}

export async function createInventoryItem(input: {
  name: string;
  category?: string;
  quantity: number;
  minimumStock: number;
}) {
  const { error } = await supabase
    .from("inventory")
    .insert({
      name: input.name,
      category: input.category || null,
      quantity: input.quantity,
      minimum_stock: input.minimumStock,
    });

  return toServiceResult(error?.message);
}

export async function deleteInventoryItem(id: string) {
  const { error } = await supabase
    .from("inventory")
    .delete()
    .eq("id", id);

  return toServiceResult(error?.message);
}

export async function uploadDocument(input: {
  file: File;
  title: string;
  category?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const storagePath = `${user?.id ?? "crew"}/${Date.now()}-${input.file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(storagePath, input.file, {
      upsert: false,
    });

  if (uploadError) {
    return toServiceResult(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("documents")
    .getPublicUrl(storagePath);

  const { error } = await supabase
    .from("documents")
    .insert({
      title: input.title,
      category: input.category || null,
      file_url: publicUrl,
      storage_path: storagePath,
      uploaded_by: user?.id ?? null,
    });

  return toServiceResult(error?.message);
}

export async function deleteDocument(id: string, storagePath?: string | null) {
  if (storagePath) {
    await supabase.storage
      .from("documents")
      .remove([storagePath]);
  }

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  return toServiceResult(error?.message);
}

export async function createEmergencyAlert(input: {
  locationId: string;
  note?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("emergencies")
    .insert({
      location_id: input.locationId,
      reporter_id: user?.id ?? null,
      note: input.note || null,
      status: "active",
      active: true,
    });

  return toServiceResult(error?.message);
}

export async function resolveEmergencyAlert(id: string) {
  const { error } = await supabase
    .from("emergencies")
    .update({
      status: "resolved",
      active: false,
      resolved_at: new Date().toISOString(),
    })
    .eq("id", id);

  return toServiceResult(error?.message);
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

function toServiceResult(error?: string) {
  return {
    ok: !error,
    error: error ?? null,
  };
}
