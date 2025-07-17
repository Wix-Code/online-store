import { Heart, RefreshCw, ShoppingCart, ZoomIn } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: number;
  description: string;
  image: string;
  price: number;
}
const ItemCard = ({id, description, image, price} : Props) => {
  return (
    <div
      key={id}
      className="group flex flex-col gap-2 cursor-pointer space-y-2 rounded mb-4"
    >
      <div className="flex gap-2">
        {/* Product Image */}
        <img
          src={image}
          alt={name ?? ""}
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

      <Link href={`/products/${id}`}>
        <h2 className="text-[14px] text-[#8b8b8b] border-b-[1px] w-fit border-[#e0e0e0] font-normal">
        {description.slice(0, 30)}...
      </h2>
      </Link>
      <p className="text-[14px] text-[#009c6dfa] font-[600]">₦{price}</p>
      <button className='text-[12px] text-black flex items-center gap-1 font-[600] cursor-pointer'><ShoppingCart className='w-[16px]' /> Add to cart</button>
    </div>
  )
}

export default ItemCard