"use client";

import Sidebar from "@/components/navigation/Sidebar";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import LogoutButton from "@/components/auth/LogoutButton";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export default function AppShell({
  children,
  title,
  subtitle,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Desktop */}
      <div className="hidden min-h-screen lg:flex">

        <aside className="w-72 border-r border-zinc-800 bg-zinc-950">

          <div className="border-b border-zinc-800 p-8">

            <h1 className="text-3xl font-bold text-red-600">
              THE FEAR LAB
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Crew Platform
            </p>

          </div>

          <Sidebar />

        </aside>

        <main className="flex-1 overflow-y-auto">

          {(title || subtitle) && (
            <header className="flex items-center justify-between border-b border-zinc-800 px-12 py-8">

              <div>

                {title && (
                  <h1 className="text-5xl font-bold">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="mt-2 text-xl text-zinc-400">
                    {subtitle}
                  </p>
                )}

              </div>

              <LogoutButton />

            </header>
          )}

          <div className="p-12">
            {children}
          </div>

        </main>

      </div>

      {/* Handy / Tablet */}
      <div className="min-h-screen pb-24 lg:hidden">

        {(title || subtitle) && (
          <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-6">

            <div>

              {title && (
                <h1 className="text-4xl font-bold">
                  {title}
                </h1>
              )}

              {subtitle && (
                <p className="mt-2 text-base text-zinc-400">
                  {subtitle}
                </p>
              )}

            </div>

            <LogoutButton />

          </header>
        )}

        <main className="p-6">
          {children}
        </main>

        <BottomNavigation />

      </div>

    </div>
  );
}