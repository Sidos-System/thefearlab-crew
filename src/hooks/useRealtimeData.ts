"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type AsyncState<T> = {
  data: T;
  loading: boolean;
};

export default function useRealtimeData<T>(
  loader: () => Promise<T>,
  initialData: T,
  tables: string[],
) {
  const tableKey = useMemo(() => tables.join(":"), [tables]);

  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: true,
  });

  const load = useCallback(async () => {
    const data = await loader();

    setState({
      data,
      loading: false,
    });
  }, [loader]);

  useEffect(() => {
    let mounted = true;

    async function safeLoad() {
      const data = await loader();

      if (!mounted) return;

      setState({
        data,
        loading: false,
      });
    }

    safeLoad();

    // WICHTIG:
    // Jeder Hook bekommt seinen eigenen Channel.
    const channel = supabase.channel(
      `realtime:${tableKey}:${crypto.randomUUID()}`
    );

    for (const table of tables) {
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
        },
        () => {
          safeLoad();
        }
      );
    }

    channel.subscribe();

    return () => {
      mounted = false;

      channel.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [loader, tableKey, tables]);

  return {
    ...state,
    refresh: load,
  };
}