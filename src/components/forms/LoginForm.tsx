"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/cards/Card";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextInput from "@/components/inputs/TextInput";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-Mail oder Passwort ist falsch.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-6 text-center text-2xl font-bold text-white sm:text-3xl">
        Crew Login
      </h2>

      <div className="space-y-4">

        <TextInput
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          placeholder="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="rounded-lg border border-red-700 bg-red-900/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <PrimaryButton
          text={loading ? "Anmelden..." : "Anmelden"}
          onClick={login}
        />

        <button className="w-full text-sm text-zinc-400 transition hover:text-red-500">
          Passwort vergessen?
        </button>

      </div>

      <div className="mt-6 border-t border-zinc-800 pt-4 text-center">
        <p className="text-xs text-zinc-500">
          Version 1.0.0
        </p>

        <p className="mt-2 text-xs text-zinc-600">
          © 2026 TheFearLab Crew Platform
        </p>
      </div>
    </Card>
  );
}