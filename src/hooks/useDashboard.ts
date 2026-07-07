"use client";

import useRealtimeData from "@/hooks/useRealtimeData";
import { getDashboardStats } from "@/services/dashboard";

export default function useDashboard() {
  const { data } = useRealtimeData(getDashboardStats, {
    teamOnline: 0,
    tasks: 0,
    documents: 0,
    emergencies: 0,
    inventory: 0,
  }, [
    "profiles",
    "tasks",
    "documents",
    "emergencies",
    "inventory",
  ]);

  return data;
}
