"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <Button
      onClick={logout}
      variant="secondary"
    >
      <LogOut size={17} />
      Abmelden
    </Button>
  );
}
