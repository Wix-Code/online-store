"use client";

import { useGetStoreById } from "@/app/api/stores";
import SearchInput from "@/app/components/SearchInput";
import SortFilter from "@/app/components/SortFilter";
import { Heart, MapPin, Package, ZoomIn } from "lucide-react";
import { FaWhatsapp, FaStore } from "react-icons/fa";
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
      <div className="max-w-[1000px] mt-8 m-auto space-y-6 animate-pulse px-4">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="h-10 w-full sm:w-[400px] bg-gray-200 rounded" />
          <div className="h-10 w-full sm:w-[120px] bg-gray-200 rounded" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="flex-[25%] space-y-4 w-full lg:w-auto">
            <div className="h-[200px] bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-[75%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full">
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

  return (
    <div className="max-w-[1100px] mt-8 space-y-6 m-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchInput onChange={() => {}} value="" className="w-full sm:w-[400px]" />
        <div className="w-full sm:w-auto">
          <SortFilter />
        </div>
      </div>

      <div className="gap-6 flex flex-col lg:flex-row">
        <div className="flex-[25%] space-y-5 w-full lg:w-auto">
          {/* Store Card */}
          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
            className="bg-[#fafafa] border flex justify-center items-center flex-col space-y-2 p-5 border-[#f5f5f5] rounded-[10px] transition-all hover:shadow-md"
          >
            <img
              className="w-[100px] h-[100px] object-cover rounded-full ring-2 ring-green-500/20"
              src={store.imageUrl}
              alt={store.name}
            />
            <p className="text-[18px] font-[700] text-gray-800 flex items-center gap-2 text-center">
              <FaStore className="text-green-600" /> {store.name}
            </p>
            <p className="text-[13px] text-gray-500 font-[400]">6y 1m on Jiji</p>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3 w-full">
            <a
              href="https://wa.me/2348125352020"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[46px] gap-2 rounded-[8px] bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition font-semibold"
            >
              <FaWhatsapp className="text-[22px]" />
              Chat Vendor
            </a>
            <a
              href="tel:+2348125352020"
              className="w-full h-[46px] rounded-[8px] gap-2 bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition font-semibold"
            >
              <FaWhatsapp className="text-[22px]" />
              Call Vendor
            </a>
          </div>

          {/* About Seller */}
          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
            className="flex flex-col bg-white rounded-[8px] p-4 text-[#8b8b8b] border border-[#f5f5f5] space-y-2"
          >
            <p className="text-[16px] font-[600] text-gray-800">About Seller</p>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {store.description || "This vendor provides fresh and organic farm produce."}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-[75%] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
            {store.products.map((item: any) => (
              <div
                key={item.id}
                className="group flex flex-col gap-2 cursor-pointer rounded-lg overflow-hidden border border-[#eee] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl?.[0]}
                    alt={item.name}
                    className="w-full h-[220px] sm:h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1 shadow-md">
                    <Heart className="w-[16px] text-gray-600" />
                  </button>
                </div>

                <div className="p-3 space-y-1">
                  <Link
                    href={`/products/${item.id}-${slugify(item.description)}`}
                    className="text-[14px] text-gray-700 hover:text-green-700 font-medium line-clamp-2"
                  >
                    {item.description}
                  </Link>

                  <p className="text-[15px] text-green-700 font-[700]">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[13px] text-gray-500 flex items-center gap-1">
                      <MapPin className="w-[14px]" />
                      {item.location || "Abuja, FCT"}
                    </span>
                    <button
                      title="View Details"
                      className="cursor-pointer bg-[#fcfcfc] p-1 shadow hover:shadow-md transition"
                    >
                      <ZoomIn className="w-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {store.products.length === 0 && (
            <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center">
              <Package className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-600">
                No products found in this store yet.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Please check back later for new items.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;