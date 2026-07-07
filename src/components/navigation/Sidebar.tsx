"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { navigationItems, settingsNavigationItem } from "@/config/navigation";
import usePermissions from "@/hooks/usePermissions";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const SettingsIcon = settingsNavigationItem.icon;
  const { profile } = useProfile();
  const { can, loading: permissionsLoading } = usePermissions();
  const profileName = profile?.full_name ?? "Crew";
  const profileRole = profile?.role ?? "Crew";
  const profileStatus = profile?.online ? "online" : "offline";

  return (
    <aside className="flex h-screen flex-col bg-surface-1">
      <div className="px-6 py-7">
        <div className="flex items-center gap-4">
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
            <h1 className="text-lg font-black leading-none">
              THE FEAR LAB
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Crew Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-3">
        <div className="space-y-1.5">
          {navigationItems.filter((item) => (
            !item.permission || (!permissionsLoading && can(item.permission))
          )).map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                className={cn(
                  "group flex h-12 items-center gap-3 rounded-[18px] px-4 text-sm font-semibold transition-all duration-200",
                  active
                    ? "bg-white text-background shadow-[0_16px_34px_rgba(0,0,0,0.24)]"
                    : "text-text-secondary hover:bg-surface-3 hover:text-white",
                )}
                href={item.href}
              >
                <Icon
                  size={19}
                  strokeWidth={2.3}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="space-y-3 border-t border-border-soft p-4">
        <Link
          className="flex h-12 items-center gap-3 rounded-[18px] px-4 text-sm font-semibold text-text-secondary transition duration-200 hover:bg-surface-3 hover:text-white"
          href={settingsNavigationItem.href}
        >
          <SettingsIcon size={19} />
          {settingsNavigationItem.label}
        </Link>

        <div className="flex items-center gap-3 rounded-[20px] bg-surface-3 p-3 ring-1 ring-white/6">
          <Avatar
            name={profileName}
            size="md"
            status={profileStatus}
          />
          <div>
            <p className="text-sm font-bold">
              {profileName}
            </p>
            <p className="text-xs text-text-muted">
              {profileRole}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
