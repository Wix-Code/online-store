"use client";

import { useGetStoreById } from "@/app/api/stores";
import SearchInput from "@/app/components/SearchInput";
import SortFilter from "@/app/components/SortFilter";
import { Heart, MapPin, RefreshCw, ZoomIn } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import React, { use } from "react";
import { slugify } from "@/app/components/CardItem";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = ({ params }: Props) => {
  const resolvedParams = use(params);
  const storeId = Number(resolvedParams.slug.split("-")[0]);

  const { data, isLoading, error } = useGetStoreById(storeId);

  // 🔹 Skeleton Loader (while fetching store)
  if (isLoading) {
    return (
      <div className="max-w-[1000px] mt-8 m-auto space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-10 w-[400px] bg-gray-200 rounded" />
          <div className="h-10 w-[120px] bg-gray-200 rounded" />
        </div>

        <div className="flex gap-6">
          {/* Sidebar Skeleton */}
          <div className="flex-[25%] space-y-4">
            <div className="h-[200px] bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded space-y-2"
              >
                <div className="h-[180px] bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <p className="text-center text-red-500">Store not found</p>;
  }

  const store = data.store;
  console.log(store, "store")

  return (
    <div className="max-w-[1000px] mt-8 space-y-4 m-auto">
      <div className="flex items-center justify-between">
        <SearchInput onChange={() => {}} value="" className="w-[400px]" />
        <div>
          <SortFilter />
        </div>
      </div>

      <div className="gap-4 flex">
        {/* Sidebar */}
        <div className="flex-[25%] space-y-4">
          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
            className="flex-[25%] bg-[#fafafa] border flex justify-center items-center space-y-2 flex-col p-5 border-[#f5f5f5]"
          >
            <img
              className="w-[100px] h-[100px] object-cover rounded-full"
              src={store.imageUrl}
              alt={store.name}
            />
            <p className="text-[16px] font-[600]">{store.name}</p>
            <p className="text-[12px] font-[400]">6y 1m on Jiji</p>
          </div>

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

          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
            className="flex flex-col bg-white rounded-[4px] p-3 text-[#8b8b8b] border border-[#f5f5f5] space-y-2"
          >
            <p className="text-[16px] font-[500]">About Seller</p>
            <p className="text-[14px] text-black font-[400]">
              {store.description}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-[75%]">
          <div className="grid grid-cols-1 bg-white sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.products.map((item: any) => (
              <div
                key={item.id}
                className="group flex flex-col gap-2 cursor-pointer space-y-2 rounded mb-4"
              >
                <div className="flex gap-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-[200px] object-cover mb-2"
                  />

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 text-[#555555]">
                    <button className="cursor-pointer bg-[#fcfcfc] p-1 shadow">
                      <Heart className="w-[16px]" />
                    </button>
                    <button
                      title="Add to compare"
                      className="cursor-pointer bg-[#fcfcfc] p-1 shadow"
                    >
                      <RefreshCw className="w-[16px]" />
                    </button>
                    <button className="cursor-pointer bg-[#fcfcfc] shadow p-1">
                      <ZoomIn className="w-[18px]" />
                    </button>
                  </div>
                </div>

                <Link href={`/products/${item.id}-${slugify(item.description)}`} className="text-[14px] text-[#8b8b8b] border-b w-fit border-[#e0e0e0] font-normal">
                  {item.description.slice(0, 30)}...
                </Link>

                <p className="text-[14px] text-[#009c6dfa] font-[600]">
                  ₦{item.price.toLocaleString()}
                </p>
                <button className="text-[14px] text-black flex items-center gap-1 font-[600] cursor-pointer">
                  <MapPin className="w-[16px]" />
                  {item.location || "Abuja, FCT"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;