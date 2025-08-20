import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-[1000px] m-auto'>
      <div>
        <div className='justify-between border-b-[1px] bg-[#00000010] py-1 px-2 border-[#f5f5f5] flex items-center'>
          <p className='text-[24px] font-[600]'>Cart</p>
          <Link className="text-[#8b8b8b] text-center text-[14px]" href="/">Home</Link>
        </div>
        <div className="justify-center mt-14 flex items-center flex-col space-y-3">
          <img
            className="w-[200px] object-cover"
            src="https://www.pricepally.com/_next/static/media/openwhitecardboarbox.eb1af938.svg"
            alt="Empty Cart"
          />
          <p className="text-[18px] text-center font-[400] text-[#555555]">
            Oops! You have not added any item to cart yet
          </p>
          <p className="text-[#8b8b8b] text-center text-[14px]">
            Go shopping, and fill up your cart with items!
          </p>
          <Link
            href="/products"
          >
            <button className="text-[14px] rounded-[40px] bg-[#e6e6e6] text-[#009c6dfa] px-5 py-2.5 flex items-center gap-1 font-[600] cursor-pointer">
              <ShoppingCart className="w-[18px]" />
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page