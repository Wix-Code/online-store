import { products } from '@/app/dummyData'
import React from 'react'
import ItemCard from '../ItemCard'

const TopSellingProducts = () => {
  return (
    <div>
      <p></p>
      <div className="max-w-[1000px] my-5 m-auto">
        <p className="font-[400] text-[] bg-[#fdfdfd] border-y-[1px] w-fit border-[#e0e0e0] mb-7 text-[28px] ">Top Selling Products</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
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