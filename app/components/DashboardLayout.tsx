"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  User,
  PlusSquare,
  Store,
  Package,
  Users,
  Bell,
  MessageSquare,
  Loader2,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasAccess(true);
    }
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-green-600 w-10 h-10" />
      </div>
    );
  }

  // ❌ If no token, show restricted access message
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Restricted 🚫
        </h2>
        <p className="text-gray-600 mb-6">
          You must be signed in to access your dashboard.
        </p>
        <div className="flex gap-4">
          <Link
            href="/sign-in"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

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
      <aside className="md:w-64 bg-gray-100 h-[calc(100vh-60px)] sticky top-[60px] py-4">
        <h2 className="text-lg pl-3 font-bold md:flex hidden mb-6">Dashboard</h2>
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
                <span className="md:flex hidden">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}