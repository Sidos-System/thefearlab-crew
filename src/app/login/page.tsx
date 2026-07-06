"use client";

import Image from "next/image";
import GuestGuard from "@/components/auth/GuestGuard";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <GuestGuard>
      <main className="grid min-h-screen bg-background px-4 py-8 text-white lg:grid-cols-[1fr_0.9fr] lg:p-6">
        <section className="relative hidden overflow-hidden rounded-[28px] border border-border-soft bg-surface-1 lg:block">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="55vw"
            src="/crew-platform-hero.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,26,31,0.98),rgba(24,26,31,0.62))]" />
          <div className="absolute bottom-10 left-10 max-w-xl">
            <div className="relative h-14 w-14 overflow-hidden rounded-[20px] bg-surface-raised ring-1 ring-white/10">
              <Image
                alt="THE FEAR LAB"
                className="object-cover"
                fill
                sizes="56px"
                src="/thefearlab-logo.png"
              />
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight">
              THE FEAR LAB Crew Platform
            </h1>
            <p className="mt-4 text-lg leading-8 text-text-secondary">
              Professionelle Event Operations für Crew, Aufgaben,
              Kommunikation und Material.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-4 lg:hidden">
              <div className="relative h-12 w-12 overflow-hidden rounded-[18px] bg-surface-raised ring-1 ring-white/10">
                <Image
                  alt="THE FEAR LAB"
                  className="object-cover"
                  fill
                  sizes="48px"
                  src="/thefearlab-logo.png"
                />
              </div>
              <div>
                <p className="text-lg font-black">THE FEAR LAB</p>
                <p className="text-sm text-text-muted">Crew Platform</p>
              </div>
            </div>

            <LoginForm />
          </div>
        </section>
      </main>
    </GuestGuard>
  );
}
