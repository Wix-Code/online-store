"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Settings,
  LogOut,
  MessageSquare,
  Bell,
  LogIn,
  UserPlus,
} from "lucide-react";
import { navLinks } from "../dummyData";
// import CartSideBar from "./CartSideBar"; // if needed later

const NavBar = () => {
  const [openSideBarCart, setOpenSideBarCart] = useState(false);
  const pathname = usePathname();

  // Example: replace this with your real auth user context or Redux state
  const user = {
    id: null, // null means not logged in
    name: "Wisdom",
  };

  // Example unread counts
  const unreadMessages = 3;
  const unreadNotifications = 5;

  const close = () => setOpenSideBarCart(false);

  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
      className="sticky top-0 bg-[#fdfdfd] z-50"
    >
      <div className="flex bg-[#fdfdfd] justify-between items-center max-w-[1200px] m-auto h-[60px] px-3">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              className="w-20"
              src="https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex gap-5 items-center">
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
                    ? "text-green-500 font-[600]"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Right side icons */}
        <div className="flex relative items-center gap-4">
          {/* Messages Icon */}
          <div className="relative cursor-pointer">
            <button className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"><MessageSquare className="text-gray-700" size={22} /></button>
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </div>

          {/* Notifications Icon */}
          <div className="relative cursor-pointer">
            <button className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"><Bell className="text-gray-700" size={22} /></button>
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </div>

          {/* Profile Section */}
          <div className="relative group">
            {user?.id ? (
              <>
                {/* Profile image */}
                <img
                  className="w-[40px] h-[40px] object-cover cursor-pointer rounded-full"
                  src="https://pictures-nigeria.jijistatic.net/179047550_MTIwMC0xNjAwLTRlM2I1YTIyNTc.webp"
                  alt="Profile"
                />

                {/* Logged-in dropdown */}
                <div
                  style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px" }}
                  className="space-y-5 p-4 absolute top-14 w-[160px] bg-white right-0 
                    opacity-0 scale-95 invisible 
                    group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                    transition-all duration-300 rounded-lg"
                >
                  <Link
                    href="/user-dashboard/post"
                    className="flex items-center gap-3 hover:text-[#009c6dfa]"
                  >
                    <ShoppingBag size={18} /> My Shop
                  </Link>
                  <Link
                    href="/setting"
                    className="flex items-center gap-3 hover:text-[#009c6dfa]"
                  >
                    <Settings size={18} /> Settings
                  </Link>
                  <button className="flex w-full items-center gap-3 text-left hover:text-[#009c6dfa]">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Default icon when not logged in */}
                <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                  <LogIn className="text-gray-700" size={20} />
                </div>

                {/* Guest dropdown */}
                <div
                  style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px" }}
                  className="space-y-4 p-4 absolute top-14 w-[160px] bg-white right-0 
                    opacity-0 scale-95 invisible 
                    group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                    transition-all duration-300 rounded-lg"
                >
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-3 hover:text-[#009c6dfa]"
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center gap-3 hover:text-[#009c6dfa]"
                  >
                    <UserPlus size={18} /> Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <CartSideBar isOpen={openSideBarCart} close={close} /> */}
    </div>
  );
};

export default NavBar;