import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Package,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { PermissionKey } from "@/types/permissions";

export type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  permission?: PermissionKey;
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/team",
    label: "Crew",
    icon: Users,
    permission: "crew.read",
  },
  {
    href: "/schedule",
    label: "Zeitplan",
    icon: Calendar,
  },
  {
    href: "/tasks",
    label: "Aufgaben",
    icon: ClipboardList,
    permission: "tasks.read",
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle,
    permission: "chat.read",
  },
  {
    href: "/documents",
    label: "Dokumente",
    icon: FileText,
    permission: "documents.read",
  },
  {
    href: "/inventory",
    label: "Inventar",
    icon: Package,
    permission: "inventory.read",
  },
  {
    href: "/admin",
    label: "Admin",
    icon: Shield,
    permission: "admin.access",
  },
];

export const bottomNavigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/team",
    label: "Crew",
    icon: Users,
    permission: "crew.read",
  },
  {
    href: "/tasks",
    label: "Tasks",
    icon: ClipboardList,
    permission: "tasks.read",
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle,
    permission: "chat.read",
  },
  {
    href: "/settings",
    label: "More",
    icon: MoreHorizontal,
  },
];

export const settingsNavigationItem: NavigationItem = {
  href: "/settings",
  label: "Einstellungen",
  icon: Settings,
};
