"use client";

import { useMemo } from "react";
import useRealtimeData from "@/hooks/useRealtimeData";
import { getCurrentUserPermissions } from "@/services/permissions";
import type { PermissionKey } from "@/types/permissions";

export default function usePermissions() {
  const {
    data,
    loading,
    refresh,
  } = useRealtimeData(getCurrentUserPermissions, [], [
    "role_permissions",
    "profiles",
    "roles",
  ]);

  const permissions = useMemo(() => new Set(data), [data]);

  function can(permission: PermissionKey) {
    return permissions.has(permission);
  }

  return {
    permissions,
    loading,
    can,
    refresh,
  };
}
