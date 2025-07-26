"use client"

import React, { useState } from 'react';
import { navLinks } from '../dummyData';
import Link from 'next/link';
import { UserRound, ShoppingCart } from 'lucide-react';
import CartSideBar from './CartSideBar';

const NavBar = () => {
  const [openSideBarCart, setOpenSideBarCart] = useState(false)

  const close = () => {
    setOpenSideBarCart(false)
  }
  return (
    <div style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"}} className='sticky top-0 z-50'>
      <div className='flex bg-[#fdfdfd] justify-between items-center max-w-[1200px] m-auto py-3'>
        <div>
          <Link href="/">
            <img
              className='w-20'
              src="https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
              alt="Logo"
            />
          </Link>
        </div>

        <div className='flex gap-4 items-center'>
          {navLinks.map((link) => (
            <Link className='text-[15px] font-[400]' key={link.id} href={link.path}>
              {link.title}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          <button onClick={() => setOpenSideBarCart(true)} className="p-2 cursor-pointer hover:bg-[#e6e6e6] rounded">
            <ShoppingCart className="w-5 h-5 text-[#009c6dfa]" />
          </button>
          <button className="p-2 cursor-pointer hover:bg-[#e6e6e6] rounded">
            <UserRound className="w-5 h-5 text-[#009c6dfa]" />
          </button>
        </div>
      </div>
      {
        
          <CartSideBar isOpen={openSideBarCart} close={close} />
        
      }
    </div>
  );
};

export default NavBar;