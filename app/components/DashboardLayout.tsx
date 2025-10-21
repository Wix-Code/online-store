"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/setting", label: "User Details" },
    { href: "/user-dashboard/post", label: "Post Product" },
    { href: "/dashboard/edit-store", label: "Store" },
    { href: "/user-dashboard/products", label: "Products" },
    { href: "/followers", label: "Followers" },
    { href: "/user-dashboard/notifications", label: "Notifications" },
    { href: "/user-dashboard/messages", label: "Messages" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 h-[calc(100vh-60px)] sticky top-[60px] py-4">
        <h2 className="text-lg pl-3 font-bold mb-6">Dashboard</h2>
        <nav>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block p-3 transition ${
                  isActive
                    ? "bg-green-500 text-white font-semibold"
                    : "text-gray-800 hover:bg-green-500 hover:text-white"
                }`}
              >
                {link.label}
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