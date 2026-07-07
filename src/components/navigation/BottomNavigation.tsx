"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavigationItems } from "@/config/navigation";
import usePermissions from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { can, loading } = usePermissions();
  const items = bottomNavigationItems.filter((item) => (
    !item.permission || (!loading && can(item.permission))
  )).slice(0, 5);

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 rounded-[24px] border border-white/10 bg-surface-1/88 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-1 rounded-[18px] text-[11px] font-semibold transition duration-200",
                active
                  ? "bg-white text-background"
                  : "text-text-muted hover:bg-surface-3 hover:text-white",
              )}
              href={item.href}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
