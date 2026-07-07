"use client";

import usePermissions from "@/hooks/usePermissions";
import type { PermissionKey } from "@/types/permissions";

type PermissionGateProps = {
  permission: PermissionKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { can, loading } = usePermissions();

  if (loading) {
    return null;
  }

  if (!can(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
