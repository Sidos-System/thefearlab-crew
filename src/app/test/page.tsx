"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.auth.getSession();

      console.log("Supabase Verbindung:");

      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-red-600">
        Supabase Test
      </h1>
    </main>
  );
}