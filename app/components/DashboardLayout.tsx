"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  User,
  PlusSquare,
  Store,
  Package,
  Users,
  Bell,
  MessageSquare,
} from "lucide-react"; // ✅ icons

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/user-dashboard/setting", label: "Manage Profile", icon: User },
    { href: "/user-dashboard/post", label: "Post Product", icon: PlusSquare },
    { href: "/user-dashboard/store", label: "Store", icon: Store },
    { href: "/user-dashboard/products", label: "Products", icon: Package },
    { href: "/user-dashboard/followers", label: "Followers", icon: Users },
    { href: "/user-dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/user-dashboard/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 h-[calc(100vh-60px)] sticky top-[60px] py-4">
        <h2 className="text-lg pl-3 font-bold mb-6">Dashboard</h2>
        <nav>
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 p-3 transition rounded-md ${
                  isActive
                    ? "bg-green-500 text-white font-semibold"
                    : "text-gray-800 hover:bg-green-500 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}