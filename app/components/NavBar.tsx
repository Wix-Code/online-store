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
  List,
  X,
} from "lucide-react";
import { navLinks } from "../dummyData";

const NavBar = () => {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Simulate auth
  const user = { id: null, name: "Wisdom" }; // replace with real user context
  const unreadMessages = 3;
  const unreadNotifications = 5;

  return (
    <header
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
      className="sticky top-0 bg-[#fdfdfd] z-50"
    >
      <div className="flex justify-between items-center max-w-[1200px] m-auto h-[60px] px-4">
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
          <button className="relative w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            <MessageSquare className="text-gray-700" size={22} />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button className="relative w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            <Bell className="text-gray-700" size={22} />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative group">
            {user?.id ? (
              <>
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                  src="https://pictures-nigeria.jijistatic.net/179047550_MTIwMC0xNjAwLTRlM2I1YTIyNTc.webp"
                  alt="Profile"
                />
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
                    href="/setting"
                    className="flex items-center gap-3 hover:text-green-600"
                  >
                    <Settings size={18} /> Settings
                  </Link>
                  <button className="flex items-center gap-3 w-full text-left hover:text-green-600">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
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
            className="md:hidden w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer transition"
            onClick={() => setMobileNavOpen(true)}
          >
            <List className="text-gray-700" size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Nav */}
      <div
        className={`fixed top-0 right-0 w-[260px] h-full bg-white z-50 transform ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-gray-200 border-b-[0.5px]">
          <h3 className="font-semibold text-lg">Menu</h3>
          <button
            className="w-[35px] h-[35px] cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-3">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.id}
                href={link.path}
                onClick={() => setMobileNavOpen(false)}
                className={`text-[15px] font-[500] px-2 py-2 rounded-md transition-colors duration-200 ${
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
      </div>

      {/* Overlay when open */}
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}
    </header>
  );
};

export default NavBar;