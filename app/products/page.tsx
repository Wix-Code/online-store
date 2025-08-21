"use client"

import { Filter, Heart, RefreshCw, Search, ShoppingCart, ZoomIn } from 'lucide-react'
import React, { useState } from 'react'
import { products } from '../dummyData'
import Link from 'next/link'
import CardItem from '../components/CardItem'
import SearchInput from '../components/SearchInput'

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

      <div className={`flex transition-all duration-300 mt-4 ${openFilter ? 'gap-4' : ''}`}>
        
        <div style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"}}
          className={`transition-all duration-300 ease-in-out ${
            openFilter ? 'w-[260px]' : 'w-0'
          } overflow-hidden`}
        >
          {openFilter && (
            <div className="h-full bg-[#fafafa] p-4">
              <h2 className='text-lg font-bold mb-4'>Filters</h2>
              <p>Put your filter UI here</p>
              <SearchInput
                value=''
                onChange={() => {}}
              />
            </div>
          )}
        </div>

        <div className={`flex-1 transition-all duration-300 grid grid-cols-1 sm:grid-cols-2 ${openFilter ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4`}>
          {
            products.map((item) => {
              return (
                <CardItem key={item.id} id={item.id} price={item.price} image={item.image} description={item.description} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default page