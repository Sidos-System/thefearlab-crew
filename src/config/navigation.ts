import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Package,
  Settings,
  Users,
} from "lucide-react";

export const navigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/team",
    label: "Crew",
    icon: Users,
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
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle,
  },
  {
    href: "/documents",
    label: "Dokumente",
    icon: FileText,
  },
  {
    href: "/inventory",
    label: "Inventar",
    icon: Package,
  },
];

export const bottomNavigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/team",
    label: "Crew",
    icon: Users,
  },
  {
    href: "/tasks",
    label: "Tasks",
    icon: ClipboardList,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle,
  },
  {
    href: "/settings",
    label: "More",
    icon: MoreHorizontal,
  },
];

export const settingsNavigationItem = {
  href: "/settings",
  label: "Einstellungen",
  icon: Settings,
};
