"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

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

  async function resetPassword() {
    if (!email) {
      setError("Bitte gib zuerst deine E-Mail-Adresse ein.");
      return;
    }

    setResetLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      setError("Der Link konnte nicht gesendet werden.");
      setResetLoading(false);
      return;
    }

    setMessage("Wenn die Adresse registriert ist, wurde ein Reset-Link versendet.");
    setResetLoading(false);
  }

  return (
    <Card
      className="w-full"
      interactive={false}
    >
      <div>
        <p className="text-sm font-semibold uppercase text-accent">
          Crew Login
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">
          Willkommen zurück
        </h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          Melde dich an, um Dashboard, Crew, Aufgaben und Dokumente zu
          verwalten.
        </p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={login}
      >
        <label className="flex h-14 items-center gap-3 rounded-[18px] border border-border-soft bg-surface-1 px-4 text-text-secondary focus-within:border-accent/60">
          <Mail size={18} />
          <input
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-text-muted"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-Mail-Adresse"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="flex h-14 items-center gap-3 rounded-[18px] border border-border-soft bg-surface-1 px-4 text-text-secondary focus-within:border-accent/60">
          <LockKeyhole size={18} />
          <input
            autoComplete="current-password"
            className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-text-muted"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Passwort"
            required
            type="password"
            value={password}
          />
        </label>

        {error && (
          <div className="rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-[18px] border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200">
            {message}
          </div>
        )}

        <Button
          className="w-full"
          disabled={loading}
          size="lg"
          type="submit"
        >
          {loading ? "Anmelden..." : "Anmelden"}
        </Button>

        <button
          className="w-full rounded-[18px] px-4 py-3 text-sm font-semibold text-text-muted transition duration-200 hover:bg-surface-raised hover:text-white"
          disabled={resetLoading}
          onClick={resetPassword}
          type="button"
        >
          {resetLoading ? "Sende Reset-Link..." : "Passwort vergessen?"}
        </button>
      </form>

      <div className="mt-8 border-t border-border-soft pt-5 text-center text-xs text-text-muted">
        THE FEAR LAB Crew Platform
      </div>
    </Card>
  );
}
