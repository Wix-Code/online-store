"use client"

import SearchInput from '@/app/components/SearchInput'
import SortFilter from '@/app/components/SortFilter'
import { products } from '@/app/dummyData'
import { Heart, Link, MapPin, RefreshCw, Search, ShoppingCart, ZoomIn } from 'lucide-react'
import React from 'react'
import {FaWhatsapp} from "react-icons/fa"


const page = () => {
  return (
    <div className='max-w-[1000px] mt-8 space-y-4 m-auto'>
      <div className='flex items-center justify-between'>
        <SearchInput
          onChange={() => { }}
          value=''
          className='w-[400px]'
        />
        <div>
          <SortFilter />
        </div>
      </div>
      <div className='gap-4 flex'>
        <div className='flex-[25%] space-y-4'>
          <div style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"}} className='flex-[25%] bg-[#fafafa] border-[1px] flex justify-center items-center space-y-2 flex-col p-5 border-[#f5f5f5]'>
            <img className='w-[100] h-[100px] object-cover rounded-[50%]' src="https://www.themarketfoodshop.com/wp-content/uploads/2018/04/buy-kidney-beans-online-212x212.jpg" alt="" />
            <p className='text-[16px] font-[600]'>Ugo's Farms Ltd</p>
            <p className='text-[12px] font-[400]'>6y 1m on Jiji</p>
          </div>
          <div className='space-y-2'>
            <a
              href="https://wa.me/2348125352020"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[46px] gap-2 rounded-[8px] bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
            >
              <FaWhatsapp className="text-[#FFFFFF] text-[22px]" />
              Chat Vendor
            </a>
            <a
              href="https://wa.me/2348125352020"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[46px] rounded-[8px] gap-2 bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
            >
              <FaWhatsapp className="text-[#FFFFFF] text-[22px]" />
              Call Vendor
            </a>
          </div>
          <div style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"}} className='flex flex-col bg-white rounded-[4px] p-3 text-[#8b8b8b] border-[1px] border-[#f5f5f5] space-y-2'>
            <p className='text-[16px] font-[500]'>About Seller</p>
            <p className='text-[14px] text-black font-[400]'>For All kinds Of Gym,Salon & Spa Equipment. Providing State Of The Art On Sports,Saloon & Spa</p>
          </div>        
        </div>
        <div className='flex-[75%]'>
          <div className='grid grid-cols-1 bg-white sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              products.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="group flex flex-col gap-2 cursor-pointer space-y-2 rounded mb-4"
                  >
                    <div className="flex gap-2">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[200px] object-cover mb-2"
                      />

                      {/* Hover icons */}
                      <div
                        className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 text-[#555555]"
                      >
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
                    
                    <h2 className="text-[14px] text-[#8b8b8b] border-b-[1px] w-fit border-[#e0e0e0] font-normal">
                      {item.description.slice(0, 30)}...
                    </h2>
                  
                    <p className="text-[14px] text-[#009c6dfa] font-[600]">₦{item.price}</p>
                    <button className='text-[14px] text-black flex items-center gap-1 font-[600] cursor-pointer'><MapPin className='w-[16px]' /> Abuja, FCT</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default page