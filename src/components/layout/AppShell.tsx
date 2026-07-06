"use client";

import Image from "next/image";
import {
  Bell,
  CalendarDays,
  Menu,
  Search as SearchIcon,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import LogoutButton from "@/components/auth/LogoutButton";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import Sidebar from "@/components/navigation/Sidebar";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Search from "@/components/ui/Search";
import useProfile from "@/hooks/useProfile";

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
    <AuthGuard>
      <AuthenticatedShell
        title={title}
        subtitle={subtitle}
      >
        {children}
      </AuthenticatedShell>
    </AuthGuard>
  );
}

function AuthenticatedShell({
  children,
  title,
  subtitle,
}: AppShellProps) {
  const { profile } = useProfile();
  const profileName = profile?.full_name ?? "Crew";
  const profileStatus = profile?.online ? "online" : "offline";

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="hidden lg:flex">
        <aside className="w-72 shrink-0 border-r border-border-soft bg-surface-1">
          <Sidebar />
        </aside>

        <main className="max-h-screen flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 border-b border-border-soft bg-background/82 backdrop-blur-2xl">
            <div className="mx-auto flex h-24 max-w-[1800px] items-center justify-between gap-8 px-8 xl:px-10">
              <div className="min-w-0">
                {title && (
                  <h1 className="truncate text-3xl font-black tracking-tight">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="mt-1 text-sm text-text-secondary">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="flex flex-1 items-center justify-end gap-3">
                <Search className="w-full max-w-xl" />

                <Button
                  aria-label="Suche"
                  className="xl:hidden"
                  size="icon"
                  variant="secondary"
                >
                  <SearchIcon size={18} />
                </Button>

                <Button
                  aria-label="Benachrichtigungen"
                  size="icon"
                  variant="secondary"
                >
                  <Bell size={18} />
                </Button>

                <Button
                  aria-label="Kalender"
                  size="icon"
                  variant="secondary"
                >
                  <CalendarDays size={18} />
                </Button>

                <Avatar
                  name={profileName}
                  size="md"
                  status={profileStatus}
                />

                <LogoutButton />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1800px] p-6 xl:p-10">
            {children}
          </div>
        </main>
      </div>

      <div className="min-h-screen pb-28 lg:hidden">
        <header className="sticky top-0 z-30 border-b border-border-soft bg-background/88 px-4 py-4 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-3">
            <Button
              aria-label="Menu"
              size="icon"
              variant="secondary"
            >
              <Menu size={19} />
            </Button>

            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-[18px] bg-surface-raised ring-1 ring-white/10">
                <Image
                  alt="THE FEAR LAB"
                  className="object-cover"
                  fill
                  sizes="40px"
                  src="/thefearlab-logo.png"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">THE FEAR LAB</p>
                {title && (
                  <p className="truncate text-xs text-text-muted">
                    {title}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                aria-label="Benachrichtigungen"
                size="icon"
                variant="secondary"
              >
                <Bell size={18} />
              </Button>
              <Avatar
                name={profileName}
                size="sm"
                status={profileStatus}
              />
            </div>
          </div>
        </header>

        <main className="px-4 py-5">
          {(title || subtitle) && (
            <div className="mb-5">
              {title && (
                <h1 className="text-3xl font-black tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-text-secondary">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}
