"use client"

import React from 'react'
import { Search } from 'lucide-react'
import LocationFilter from '../components/stores/LocationFilter'
import Link from 'next/link'
import SearchInput from '../components/SearchInput'
import SortFilter from '../components/SortFilter'
import { useGetAllStores } from '../api/stores'

const Page = () => {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage, isFetchingNextPage } = useGetAllStores({
    search: undefined,
    sort: undefined,
    location: undefined
  });

  const stores = data?.pages?.flatMap(page => page.data.stores) || [];

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
          <SortFilter />
        </div>
      </div>

      {isLoading ? (
        // 🔹 Skeleton loading state
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="p-5 space-y-2 rounded animate-pulse border border-gray-200"
            >
              <div className="h-[200px] bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {stores?.map((store) => (
            <div
              key={store.id}
              style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
              className='p-5 space-y-2 rounded'
            >
              <img
                src={store.imageUrl}
                alt={store?.name}
                className='mb-2 h-[200px] w-full object-cover rounded'
              />
              <Link href={`/stores/${store.id}`}>
                <h2 className='text-lg font-semibold'>{store?.name}</h2>
              </Link>
              <div className='flex items-center gap-2'>
                <p className='text-[14px] text-[#555555] font-[600]'>Location:</p>
                <p className='text-[14px] font-[400] text-[#8b8b8b]'>{store.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page