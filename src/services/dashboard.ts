import { supabase } from "@/lib/supabase";

type RowFilter = {
  column: string;
  value: boolean | string | number;
};

async function countRows(table: string, filter?: RowFilter) {
  let query = supabase
    .from(table)
    .select("*", {
      count: "exact",
      head: true,
    });

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { count, error } = await query;

  if (error) {
    return 0;
  }

  return count ?? 0;
}

export async function getDashboardStats() {
  const [
    teamOnline,
    tasks,
    documents,
    emergencies,
    inventory,
  ] = await Promise.all([
    countRows("profiles", {
      column: "online",
      value: true,
    }),
    countRows("tasks", {
      column: "completed",
      value: false,
    }),
    countRows("documents"),
    countRows("emergencies", {
      column: "active",
      value: true,
    }),
    countRows("inventory"),
  ]);

  return {
    teamOnline,
    tasks,
    documents,
    emergencies,
    inventory,
  };
}
