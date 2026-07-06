"use client";

import { useEffect, useState } from "react";
import { getCurrentProfile } from "@/services/profile";
import { Profile } from "@/types/profile";

export default function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getCurrentProfile();

      setProfile(data);
      setLoading(false);
    }

    load();
  }, []);

  return {
    profile,
    loading,
  };
}