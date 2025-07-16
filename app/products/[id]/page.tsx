import { products } from "@/app/dummyData";
import { Heart, Minus, Plus, RefreshCw, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";

export default function SingleItem({ params }: { params: { id: string } }) {
   return (
    <div className="p-6">
       <div className="flex max-w-[1000px] m-auto gap-4">
         <div className="flex-[50%]">
           <img className="w-[100%]" src="https://www.themarketfoodshop.com/wp-content/uploads/2021/07/IMG-20210527-WA0010-212x212.jpg" alt="" />
         </div>
         <div className="flex-[50%] space-y-4">
           <p className="text-[30px] font-[400]">Smoked Eja Abo ( ukpek fish)</p>
           <div className="flex items-center gap-1">
             <p className="text-[26px] text-[#009c6dfa] font-[400]">₦30,000</p>
             -
             <p className="text-[26px] text-[#009c6dfa] font-[400]">₦30,000</p>
           </div>
           <p className="text-[12px] text-[#555555] font-[400]">Smoked eja abo also known as smoked sole fish. It is also called Ukpek fish in some areas..</p>
           <p className="text-[12px] text-[#555555] font-[400]">it’s available in packs of 10pieces.</p>
           <p className="text-[12px] text-[#555555] font-[400]">Swe have them in 2 sizes – medium and large.</p>
           <p className="text-[12px] text-[#555555] font-[400]">We also have combo packs</p>
           <div className="items-center gap-2 flex">
             <div className="flex py-2.5 items-center gap-2">
               <button className="h-[40px] cursor-pointer px-2.5 bg-[#fcfcfc] border-[1px] border-[#f5f5f5]"><Minus className="w-[12px]" /></button>
               <p className="text-[#555555] text-[14px]">0</p>
               <button className="h-[40px] cursor-pointer px-2.5 bg-[#fcfcfc] border-[1px] border-[#f5f5f5]"><Plus className="w-[12px]" /></button>
             </div>
             <button className="text-white cursor-pointer uppercase bg-black px-5.5 h-[40px] text-[12px] font-[400]">Add to cart</button>
           </div>
           <button className="text-[#555555] cursor-pointer flex gap-2 items-center text-[12px]"><Heart className="w-[16px]" /> Add to wishlist</button>
           <button className="text-[#555555] cursor-pointer flex gap-2 items-center text-[12px]"><RefreshCw className="w-[16px]" /> Add to compare</button>
         </div>
       </div>
       <div className="max-w-[1000px] mt-10 m-auto">
         <p className="font-[400] text-[] bg-[#fdfdfd] border-y-[1px] w-fit border-[#e0e0e0] mb-7 text-[28px] ">Related Products</p>
         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
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

                  <Link href={`/products/${item.id}`}>
                    <h2 className="text-[14px] text-[#8b8b8b] border-b-[1px] w-fit border-[#e0e0e0] font-normal">
                    {item.description.slice(0, 30)}...
                  </h2>
                  </Link>
                  <p className="text-[14px] text-[#009c6dfa] font-[600]">₦{item.price}</p>
                  <button className='text-[12px] text-black flex items-center gap-1 font-[600] cursor-pointer'><ShoppingCart className='w-[16px]' /> Add to cart</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}