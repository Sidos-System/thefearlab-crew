"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-xl bg-red-700 px-4 py-2 font-semibold text-white transition hover:bg-red-800"
    >
      Abmelden
    </button>
  );
}