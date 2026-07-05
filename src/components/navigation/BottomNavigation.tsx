"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", icon: "🏠", label: "Home" },
    { href: "/team", icon: "👥", label: "Team" },
    { href: "/tasks", icon: "✅", label: "Aufgaben" },
    { href: "/chat", icon: "💬", label: "Chat" },
    { href: "/settings", icon: "⚙️", label: "Mehr" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-md justify-around py-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-xs transition ${
              pathname === item.href
                ? "text-red-600"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}