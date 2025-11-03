"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Settings,
  LogOut,
  MessageSquare,
  Bell,
  LogIn,
  UserPlus,
  List,
  X,
} from "lucide-react";
import { navLinks } from "../dummyData";
import { motion, AnimatePresence } from "framer-motion";
import { useGetNotificationsByUserId } from "../api/notifications";

const NavBar = () => {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-object") || "{}") : {};
  const { data, isLoading  } = useGetNotificationsByUserId(user?.id)
  
  const unReadNotifications = data?.data?.unreadCount ?? 0

  const unreadMessages = 3;
  const unreadNotifications = 5;

  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-object");
    router.push("/")
  };


  return (
    <header
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
      className="sticky top-0 bg-[#fdfdfd] z-50"
    >
      <div className="flex justify-between items-center max-w-[1200px] m-auto h-[70px] md:h-[60px] px-4">
        {/* Logo */}
        <Link href="/">
          <img
            className="w-20"
            src="https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
            alt="Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.id}
                href={link.path}
                className={`text-[15px] font-[500] transition-colors duration-200 ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          {/* Messages */}
          <Link href="/user-dashboard/messages" className="relative w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            <MessageSquare className="text-gray-700" size={22} />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <Link href="/user-dashboard/notifications" className="relative w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            <Bell className="text-gray-700" size={22} />
            {unReadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {unReadNotifications}
              </span>
            )}
          </Link>

          {/* Profile / Auth */}
          <div className="relative group hidden md:block">
            {user?.id ? (
              <>
                <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                  <Settings className="text-gray-700" size={20} />
                </div>
                <div
                  style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 3px 0px" }}
                  className="absolute top-12 right-0 w-[170px] bg-white rounded-lg p-4 space-y-4 opacity-0 scale-95 invisible 
                    group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-300"
                >
                  <Link
                    href="/user-dashboard/post"
                    className="flex items-center gap-3 hover:text-green-600"
                  >
                    <ShoppingBag size={18} /> My Shop
                  </Link>
                  <Link
                    href="/user-dashboard/setting"
                    className="flex items-center gap-3 hover:text-green-600"
                  >
                    <Settings size={18} /> Settings
                  </Link>
                  <button onClick={logout} className="flex items-center gap-3 w-full text-left hover:text-green-600">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-[40px] h-[40px] bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                  <LogIn className="text-gray-700" size={20} />
                </div>
                <div
                  style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 3px 0px" }}
                  className="absolute top-12 right-0 w-[170px] bg-white rounded-lg p-4 space-y-4 opacity-0 scale-95 invisible 
                    group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-300"
                >
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-3 hover:text-green-600"
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center gap-3 hover:text-green-600"
                  >
                    <UserPlus size={18} /> Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
            onClick={() => setMobileNavOpen(true)}
          >
            <List className="text-gray-700" size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Nav */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 w-[270px] h-full bg-white z-50 shadow-lg flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="font-semibold text-lg">Menu</h3>
                <button
                  className="w-[35px] h-[35px] flex items-center justify-center rounded-full hover:bg-gray-100"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <X size={22} className="text-gray-700" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col p-4 space-y-3 flex-grow overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.path ||
                    (link.path !== "/" && pathname.startsWith(link.path));
                  return (
                    <Link
                      key={link.id}
                      href={link.path}
                      onClick={() => setMobileNavOpen(false)}
                      className={`text-[15px] font-[500] px-2 py-3 rounded-md transition-colors duration-200 ${
                        isActive
                          ? "bg-green-500 text-white font-semibold"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                      }`}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer (Auth Section) */}
              <div className="border-t border-gray-200 p-4 flex flex-col gap-3 bg-gray-50">
                {user?.id ? (
                  <>
                    <Link
                      href="/user-dashboard/post"
                      onClick={() => setMobileNavOpen(false)}
                      className="flex items-center gap-3 hover:text-green-600"
                    >
                      <ShoppingBag size={18} /> My Shop
                    </Link>
                    <Link
                      href="/setting"
                      onClick={() => setMobileNavOpen(false)}
                      className="flex items-center gap-3 hover:text-green-600"
                    >
                      <Settings size={18} /> Settings
                    </Link>
                    <button onClick={logout} className="flex items-center gap-3 text-left hover:text-green-600">
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileNavOpen(false)}
                      className="flex items-center gap-3 hover:text-green-600"
                    >
                      <LogIn size={18} /> Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileNavOpen(false)}
                      className="flex items-center gap-3 hover:text-green-600"
                    >
                      <UserPlus size={18} /> Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              onClick={() => setMobileNavOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;