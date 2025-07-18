import Link from 'next/link'
import React from 'react'

const InfoCard = () => {
  return (
    <div className='bg-[#7fdac611] py-2'>
      <div className='max-w-[1000px] flex items-center gap-5 m-auto'>
        <div className='flex-1 space-y-2'>
          <p className='text-[38px] leading-12.5 font-[800]'>A Variety of Stores to choose from</p>
          <p className='text-[20px] mb-6 text-[#555555] '>Order food from the best restaurants, local favorites, and online vendors using the app or web.</p>
          <Link className='bg-[#000000]  px-7 py-4 text-[#FFFFFF] text-[14px] font-[600]' href="/products">
            Order now!
          </Link>
        </div>
        <div className='flex-1'>
          <img className='h-[400px] object-cover w-full' src="https://cdn.prod.website-files.com/65e8c28f089978cd40da4f5c/66c62cc20f8b19a270824aee_Local%20Line%20Blog%20Feature%20Image_Offer%20Home%20Delivery%20For%20Your%20Farm.webp" alt="" />
        </div>
      </div>
    </div>
  )
}

export default InfoCard