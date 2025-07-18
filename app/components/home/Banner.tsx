"use client"

import { banner } from '@/app/dummyData'
import React from 'react'

const Banner = () => {
  return (
    <div>
      <div className='max-w-[1000px] m-auto grid grid-cols-2 gap-5'>
        {
          banner.map((banner) => {
            return (
              <div key={banner.id}>
                <img src={banner.image} alt="" />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Banner