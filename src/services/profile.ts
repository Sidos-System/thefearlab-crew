import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";

export async function getCurrentProfile(): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return null;
  }

  return data as Profile;
}

export async function updateCurrentProfile(input: {
  fullName: string;
  phone?: string;
  status?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      error: "Nicht angemeldet.",
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.fullName,
      phone: input.phone || null,
      presence_status: input.status || "online",
      online: input.status !== "offline",
    })
    .eq("id", user.id);

  return {
    ok: !error,
    error: error?.message ?? null,
  };
}
