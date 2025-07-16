import React from 'react'
import { stores } from '../dummyData'
import { Search } from 'lucide-react'

const page = () => {
  return (
    <div className='max-w-[1200px] mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Stores</h1>
        <div>
          <div className='w-[400px] flex items-center p-2 text-[#8b8b8b] border-[1px] border-[#f5f5f5] gap-2'>
            <Search className='w-[18px]'/>
            <input type="text" placeholder="Search stores..." className='text-[15px] text-[#8b8b8b] outline-none font-[400] rounded w-full' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Map through the stores data and display each store */}
        {stores.map((store) => (
          <div key={store.id} className='border p-4 rounded'>
            <img src={store.image} alt={store.name} className='mb-2' />
            <h2 className='text-lg font-semibold'>{store.name}</h2>
            <p className='text-sm text-[#8b8b8b]'>{store.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page