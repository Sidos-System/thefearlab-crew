"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard";

export default function useDashboard() {
  const [stats, setStats] = useState({
    teamOnline: 0,
    tasks: 0,
    documents: 0,
    emergencies: 0,
    inventory: 0,
  });

  useEffect(() => {
    async function load() {
      const data = await getDashboardStats();
      setStats(data);
    }

    load();

    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
