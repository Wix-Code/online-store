import React from 'react';
import { navLinks } from '../dummyData';
import Link from 'next/link';
import { UserRound } from 'lucide-react';

const NavBar = () => {
  return (
    <div className='sticky top-0 z-50 shadow-md'>
      <div className='flex bg-[#f7f7f7] justify-between items-center px-4 py-3'>
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

        <div>
          <button className="p-2 hover:bg-[#e6e6e6] rounded">
            <UserRound className="w-5 h-5 text-[#2B50D6]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;