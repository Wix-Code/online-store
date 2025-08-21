import React from 'react'
import { stores } from '../dummyData'
import { Search } from 'lucide-react'
import LocationFilter from '../components/stores/LocationFilter'
import Link from 'next/link'
import SearchInput from '../components/SearchInput'

const page = () => {
  return (
    <div className='max-w-[1000px] mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Stores</h1>
        <div className='items-center flex gap-4'>
          <SearchInput
            value=''
            onChange={() => {}}
          />
          <LocationFilter />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Map through the stores data and display each store */}
        {stores.map((store) => (
          <div key={store.id} style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"}} className='p-5 space-y-2 rounded'>
            <img src={store.image} alt={store.name} className='mb-2' />
            <Link href={`/stores/${store.id}`}>
              <h2 className='text-lg font-semibold'>{store.name}</h2>
            </Link>
            <div className='flex items-center gap-2'>
              <p className='text-[14px] text-[#555555] font-[600]'>Location:</p>
              <p className='text-[14px] font-[400] text-[#8b8b8b]'>{store.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page