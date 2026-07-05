"use client";

import Image from "next/image";

import GuestGuard from "@/components/auth/GuestGuard";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <GuestGuard>
      <main className="flex min-h-screen items-center justify-center bg-black px-5">
        <div className="w-full max-w-sm">

          <Image
            src="/thefearlab-logo.png"
            alt="TheFearLab Logo"
            width={250}
            height={250}
            priority
            className="mx-auto mb-6 h-auto w-40 sm:w-56"
          />

          <LoginForm />

        </div>
      </main>
    </GuestGuard>
  );
}