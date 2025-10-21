"use client";

import React, { useState } from "react";
import { navLinks } from "../dummyData";
import Link from "next/link";
import { ShoppingBag, Settings, LogOut } from "lucide-react";
import CartSideBar from "./CartSideBar";

const NavBar = () => {
  const [openSideBarCart, setOpenSideBarCart] = useState(false);

  const close = () => {
    setOpenSideBarCart(false);
  };

  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
      className="sticky top-0 bg-[#fdfdfd] z-50"
    >
      <div className="flex bg-[#fdfdfd] justify-between items-center max-w-[1200px] m-auto h-[60px]">
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
        <div className="flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              className="text-[15px] font-[400]"
              key={link.id}
              href={link.path}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Profile Dropdown */}
        <div className="flex relative items-center gap-3">
          <div className="relative group">
            {/* Profile image */}
            <img
              className="w-[40px] h-[40px] object-cover cursor-pointer rounded-full"
              src="https://pictures-nigeria.jijistatic.net/179047550_MTIwMC0xNjAwLTRlM2I1YTIyNTc.webp"
              alt="Profile"
            />

            {/* Dropdown */}
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px" }}
              className="space-y-5 p-4 absolute top-14 w-[160px] bg-white right-0 
                       opacity-0 scale-95 invisible 
                       group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                       transition-all duration-300 rounded-lg"
            >
              <Link href="/stores" className="flex cursor-pointer items-center gap-4 hover:text-[#009c6dfa]">
                <ShoppingBag />
                My shop
              </Link>
              <Link href="/setting" className="flex cursor-pointer items-center gap-4 hover:text-[#009c6dfa]">
                <Settings />
                Settings
              </Link>
              <div className="flex cursor-pointer items-center gap-4 hover:text-[#009c6dfa]">
                <LogOut />
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uncomment if you want CartSideBar */}
      {/* <CartSideBar isOpen={openSideBarCart} close={close} /> */}
    </div>
  );
};

export default NavBar;