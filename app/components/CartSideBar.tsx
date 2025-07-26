import { ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { products } from '../dummyData';

type Props = {
  isOpen: boolean;
  close?: () => void;
};

const CartSideBar = ({ isOpen, close }: Props) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the component renders before starting animation
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Delay hiding the component until animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed inset-0 bg-[#0000003d] bg-opacity-50 z-40
        transition-opacity duration-500 ease-in-out
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={close}
    >
      {/* Sidebar */}
      <div
        data-sidebar
        className={`
          fixed top-0 right-0 h-screen bg-white max-w-[300px] w-full p-5 border-l border-[#f5f5f5]
          transform transition-transform duration-500 ease-in-out
          ${isAnimating ? 'translate-x-0' : 'translate-x-full'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center'>
          <p className="text-[16px] uppercase font-[600] text-[#555555]">
            Shopping Cart
          </p>
          <button
            onClick={close}
            className="p-2 cursor-pointer bg-[#e6e6e6] rounded"
          >
            <X className="w-5 h-5 text-[#009c6dfa]" />
          </button>
        </div>
        <div className='max-h-[500px] mt-3 hide-scrollbar overflow-y-auto'>
          {
            products.length === 0 ? (
              <div className="justify-center mt-14 flex items-center flex-col space-y-3">
                <img
                  className="w-[200px] object-cover"
                  src="https://www.pricepally.com/_next/static/media/openwhitecardboarbox.eb1af938.svg"
                  alt="Empty Cart"
                />
                <p className="text-[14px] text-center font-[400] text-[#555555]">
                  Oops! You have not added any item to cart yet
                </p>
                <p className="text-[#8b8b8b] text-center text-[12px]">
                  Go shopping, and fill up your cart with items!
                </p>
                <Link
                  href="/products"
                  onClick={close}
                  className="text-[12px] rounded-[40px] bg-[#e6e6e6] text-[#009c6dfa] px-5 py-3 flex items-center gap-1 font-[600] cursor-pointer"
                >
                  <ShoppingCart className="w-[16px]" />
                  Start Shopping
                </Link>
              </div>
            ): (
            <div className=''>
              {
                products.map((item) => {
                  return (
                    <div className='flex border-b-[1px] py-3 border-[#f5f5f5] justify-between gap-3'>
                      <div className='flex gap-1'>
                        <img className='w-[65px] h-[65px] object-cover' src={item.image} alt="" />
                        <div className='space-y-1'>
                          <p className='text-[11px] uppercase text-[#555555] font-[400]'>{item.description}</p>
                          <p className='text-[12px] text-[#009c6dfa] font-[600]'>₦{item.price}</p>
                        </div>
                      </div>
                      <div>
                        
                        <X className='w-[12px] cursor-pointer' />
                      
                      </div>
                    </div>
                  )
                })
              }
              <div className='mt-3 space-y-3'>
                <div className='flex items-center pb-3 border-[#f5f5f5] border-b-[1px] justify-between'>
                  <p className='text-[16px] text-[#555555] uppercase font-[600]'>Subtotal:</p>
                  <p className='text-[16px] text-[#009c6dfa] font-[600]'>₦34,000</p>
                </div>
                <Link href="/cart">
                  <button className='uppercase cursor-pointer bg-[#f5f5f5] py-2.5 w-full text-[#555555] text-[12px]'>View cart</button>
                </Link>
                <button className='uppercase mt-3 cursor-pointer bg-[#009c6dfa] py-2.5 w-full text-white text-[12px]'>CheckOut</button>
              </div>
            </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;