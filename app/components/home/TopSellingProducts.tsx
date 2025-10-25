import { products } from '@/app/dummyData'
import React from 'react'
import ItemCard from '../ItemCard'

const TopSellingProducts = () => {
  return (
    <div>
      <p></p>
      <div className="max-w-[1000px]  my-5 m-auto">
        <p className="font-[400] text-[] mx-5 md:mx-[0px] bg-[#fdfdfd] border-y-[1px] w-fit border-[#e0e0e0] mb-7 text-[24px] md:text-[28px] ">Top Selling Products</p>
        <div className='grid mx-5 overflow-hidden md:mx-[0px] grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {
            products.map((item) => {
              return (
                <ItemCard key={item.id} id={item.id} price={item.price} image={item.image}      description={item.description} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TopSellingProducts