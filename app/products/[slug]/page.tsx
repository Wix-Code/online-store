"use client";

import { useGetProductById } from "@/app/api/products";
import ItemCard from "@/app/components/ItemCard";
import { products } from "@/app/dummyData";
import { Eye, Heart, Locate, MapPin, Minus, Plus, RefreshCw } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function SingleItem({ params }: { params: { slug: string } }) {

  const [showContact, setShowContact] = useState(false);
  // slug looks like "2-original-fresh-red-palm-oil"
  const productId = Number(params.slug.split("-")[0]);

  const { data, isLoading, error } = useGetProductById(productId);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error || !data) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const product = data.product;
  console.log(product, "product")

  return (
    <div className="p-6">
      <div className="flex max-w-[1100px] m-auto gap-4">
        <div className="flex-[70%]">
          <img
            className="w-[100%] object-cover h-[700px]"
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
          />
          <div className="flex my-2 items-center gap-3">
            <img className="w-[200px] h-[200px] object-cover" src="https://pictures-nigeria.jijistatic.net/181275610_MzAwLTQwMC0wNzAwZTlhYWFh.webp" alt="" />
            <img className="w-[200px] h-[200px] object-cover" src="https://pictures-nigeria.jijistatic.net/181275610_MzAwLTQwMC0wNzAwZTlhYWFh.webp" alt="" />
          </div>
          <div className="w-full bg-[#fafafa] border flex space-y-7 flex-col p-4 border-[#f5f5f5]">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-[30px] font-[600]">{product.name}</p>
                <button className="text-[#555555] cursor-pointer flex gap-2 items-center text-[12px]"><Heart className="w-[16px]" />Add to wishlist</button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[12px] flex items-center gap-1 text-[#555555] font-[400]"><MapPin className="w-[18px] inline-block" /> {product.location || "Lagos, Ojo, 1 hour ago"}</p>
                <p className="text-[12px] flex items-center gap-1 text-[#555555] font-[400]"> <Eye className="w-[18px] inline-block"/> {"9 views"}</p>
              </div>
            </div>
            <div className="space-y-3 border-y-[1px] py-2 border-[#b6b6b6]">
              <p>Store Address</p>
              <div className="space-y-3">
                <p className="text-[14px] flex items-center gap-1 text-[#555555] font-[600]"><MapPin className="w-[18px] inline-block" /> {product.location || "Lagos, Ojo, 1 hour ago"}</p>
                <p className="text-[14px] text-[#555555] font-[400]">2 Ajibola Crescent, Ketu, Alapere Bustop,</p>
              </div>
              <div>

              </div>
            </div>
            <p className="text-[16px] text-[#555555] font-[400]">{product.description}</p>
            <div className="space-y-2 flex flex-col">
              <button onClick={() => setShowContact(!showContact)} className="w-[300px] h-[46px] border-green-500 cursor-pointer border-[1px] rounded-[4px] gap-2 text-[#ffffff] bg-green-500 transition">{showContact ? "Hide Number" : "Show Number"}</button>
              {showContact && <a href={`tel:${"08126829146"}`} className="text-[16px] text-[#555555] font-[400]">08126829146</a>}
            </div>
          </div>
          <div className="my-7">
            <p className="font-[400] text-[] bg-[#fdfdfd] border-y-[1px] w-fit border-[#e0e0e0] mb-7 text-[28px] ">Related Products</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {
                products.map((item) => {
                  return (
                    <ItemCard key={item.id} id={item.id} price={item.price} image={item.image} description={item.description} />
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="flex-[30%] space-y-4">
          <div className="w-full bg-[#fafafa] border flex space-y-2 flex-col p-4 border-[#f5f5f5]">
            <p className="text-[30px] text-[#009c6dfa] font-[600]">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
          {/* <div className="items-center gap-2 flex">
            <div className="flex py-2.5 items-center gap-2">
              <button className="h-[40px] px-2.5 bg-[#fcfcfc] border border-[#f5f5f5]">
                <Minus className="w-[12px]" />
              </button>
              <p className="text-[#555555] text-[14px]">0</p>
              <button className="h-[40px] px-2.5 bg-[#fcfcfc] border border-[#f5f5f5]">
                <Plus className="w-[12px]" />
              </button>
            </div>
            <button className="text-white uppercase bg-black px-5.5 h-[40px] text-[12px] font-[400]">
              Add to cart
            </button>
          </div> */}
          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
            className="w-full bg-[#fafafa] border flex space-y-2 flex-col p-4 border-[#f5f5f5]"
          >
            <img
              className="w-[100px] h-[100px] object-cover rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBzvBsz2tDOPYmPViLHh1avwrDCrQs2NX2Q&s"
              alt="Store Name"
            />
            <p className="text-[16px] font-[600]">Ugo Farms</p>
            <p className="text-[12px] font-[400]">6y 1m on Jiji</p>
            <div className="space-y-2">
              <a
                href="https://wa.me/2348125352020"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[46px] gap-2 rounded-[8px] bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-[22px]" />
                Chat Vendor
              </a>
              <a
                href="https://wa.me/2348125352020"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[46px] rounded-[8px] gap-2 bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-[22px]" />
                Call Vendor
              </a>
            </div>
          </div>
          <div className="w-full bg-[#fafafa] border flex space-y-2 flex-col p-4 border-[#f5f5f5]">
            <p className="text-[16px] text-center text-[#000000] font-[600]">Safe Tips</p>
            <div className="ml-4 space-y-1">
              <li className="text-[14px] text-[#555555] font-[400]">Avoid paying in advance, even for delivery</li>
              <li className="text-[14px] text-[#555555] font-[400]">Meet with the seller at a safe public place</li>
              <li className="text-[14px] text-[#555555] font-[400]">Inspect the item and ensure it's exactly what you want</li>
              <li className="text-[14px] text-[#555555] font-[400]">Make sure that the packed item is the one you've inspected</li>
              <li className="text-[14px] text-[#555555] font-[400]">Only pay if you're satisfied</li>
            </div>
          </div>
          <div className="w-full bg-[#fafafa] border flex space-y-2 flex-col p-4 border-[#f5f5f5]">
            <button className="w-full h-[46px] border-green-500 cursor-pointer border-[1px] rounded-[8px] gap-2 bg-white text-[#555555] hover:text-white hover:bg-green-500 transition">Post Product</button>
          </div>
          {/* <button className="text-[#555555] flex gap-2 items-center text-[12px]">
            <Heart className="w-[16px]" /> Add to wishlist
          </button>
          <button className="text-[#555555] flex gap-2 items-center text-[12px]">
            <RefreshCw className="w-[16px]" /> Add to compare
          </button> */}
        </div>
      </div>
    </div>
  );
}