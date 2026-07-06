import type { UnknownRecord } from "@/types/domain";

export function readString(
  record: UnknownRecord,
  keys: string[],
  fallback = "",
) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return fallback;
}

export function readNullableString(
  record: UnknownRecord,
  keys: string[],
) {
  const value = readString(record, keys);
  return value.length > 0 ? value : null;
}

export function readNumber(
  record: UnknownRecord,
  keys: string[],
  fallback = 0,
) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return fallback;
}

export function readBoolean(
  record: UnknownRecord,
  keys: string[],
  fallback = false,
) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "boolean") {
      return value;
    }
  }

  return fallback;
}
