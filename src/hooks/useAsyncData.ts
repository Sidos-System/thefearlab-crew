"use client";

import { useEffect, useState } from "react";

type AsyncState<T> = {
  data: T;
  loading: boolean;
};

export default function useAsyncData<T>(
  loader: () => Promise<T>,
  initialData: T,
  refreshMs?: number,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      const data = await loader();

      if (mounted) {
        setState({
          data,
          loading: false,
        });
      }
    }

    load();

    const interval = refreshMs ? window.setInterval(load, refreshMs) : null;

    return () => {
      mounted = false;

      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [loader, refreshMs]);

  return state;
}
