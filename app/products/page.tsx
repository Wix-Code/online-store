"use client"

import { Filter, Heart, RefreshCw, Search, ShoppingCart, ZoomIn } from 'lucide-react'
import React, { useState } from 'react'
import { products } from '../dummyData'
import Link from 'next/link'

const page = () => {
  const [openFilter, setOpenFilter] = useState(false)

  const handleOpen = () => {
    setOpenFilter(!openFilter)
  }

  return (
    <div className='max-w-[1000px] m-auto'>
      {/* Top Bar */}
      <div className='flex border-y-[1px] bg-[#fdfdfd] py-3 border-[#f5f5f5] items-center mt-4 justify-between'>
        <p className='text-[20px] font-[600]'>Products</p>
        <div className='flex items-center gap-4'>
          <p className='text-[12px] text-[#8b8b8b]'>Showing 1–12 of 13 results </p>
          <div onClick={handleOpen} className='flex cursor-pointer items-center gap-3'>
            <p>Filter</p>
            <Filter className='w-[16px]' />
          </div>
        </div>
      </div>

      {/* Main Content with Slide-in Filter */}
      <div className={`flex transition-all duration-300 mt-4 ${openFilter ? 'gap-4' : ''}`}>
        
        {/* Filter Panel */}
        <div style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"}}
          className={`transition-all duration-300 ease-in-out ${
            openFilter ? 'w-[260px]' : 'w-0'
          } overflow-hidden`}
        >
          {openFilter && (
            <div className="h-full bg-[#fafafa] p-4">
              {/* Your filter content */}
              <h2 className='text-lg font-bold mb-4'>Filters</h2>
              <p>Put your filter UI here</p>
              <div className='flex bg-white rounded-[4px] items-center px-3 h-[46px] text-[#8b8b8b] border-[1px] border-[#f5f5f5] gap-2'>
                <Search className='w-[18px]'/>
                <input type="text" placeholder="Search products..." className='text-[14px] text-[#8b8b8b] outline-none font-[400] rounded flex-1' />
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className={`flex-1 transition-all duration-300 grid grid-cols-1 sm:grid-cols-2 ${openFilter ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} xl:grid-cols-5 gap-4`}>
          {
            products.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer flex flex-col space-y-2 rounded mb-4"
              >
                <div className="flex gap-2">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[200px] object-cover mb-2"
                  />

                  {/* Hover icons */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 text-[#555555]">
                    <button className="cursor-pointer bg-[#fcfcfc] p-1 shadow">
                      <Heart className="w-[16px]" />
                    </button>
                    <button title="Add to compare" className="cursor-pointer bg-[#fcfcfc] p-1 shadow">
                      <RefreshCw className="w-[16px]" />
                    </button>
                    <button className="cursor-pointer bg-[#fcfcfc] shadow p-1">
                      <ZoomIn className="w-[18px]" />
                    </button>
                  </div>
                </div>

                <Link href={`/products/${item.id}`}>
                  <h2 className="text-[14px] text-[#8b8b8b] border-b-[1px] w-fit border-[#e0e0e0] font-normal">
                    {item.description.slice(0, 30)}...
                  </h2>
                </Link>
                <p className="text-[14px] text-[#555555] font-[600]">₦{item.price}</p>
                <button className='text-[12px] text-black flex items-center gap-1 font-[600] cursor-pointer'>
                  <ShoppingCart className='w-[16px]' /> Add to cart
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page