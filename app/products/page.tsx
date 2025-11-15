"use client";

import React, { useState } from "react";
import { Filter, Package } from "lucide-react";
import Link from "next/link";
import CardItem from "../components/CardItem";
import SearchInput from "../components/SearchInput";
import SortFilter from "../components/SortFilter";
import LocationFilter from "../components/stores/LocationFilter";
import { useGetAllProducts } from "../api/products";
import { categories } from "../components/home/Caategories";

const Page = () => {
  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useGetAllProducts({
    search: undefined,
    sort: "newest",
    location: undefined,
  });

  const products = data?.pages?.flatMap((page) => page.data.products) || [];
  const [openFilter, setOpenFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleOpen = () => setOpenFilter(!openFilter);

  const handleCategorySelect = (name: string) => {
    setActiveCategory((prev) => (prev === name ? null : name));
    // Later: trigger API filter logic here
  };

  console.log(products, "products")

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* ---------- Top Bar ---------- */}
      <div className="flex border-y md:px-0 px-5 bg-[#fdfdfd] py-3 border-[#f5f5f5] items-center mt-5 justify-between">
        <p className="text-[20px] font-[600]">Products</p>
        <div className="flex items-center gap-4">
          <p className="text-[12px] text-[#8b8b8b]">
            Showing 1–{products.length} of {data?.pages?.[0]?.data?.total ?? 0} results
          </p>
          <div
            onClick={handleOpen}
            className="flex cursor-pointer items-center gap-2"
          >
            <p className="text-sm font-[500]">Filter</p>
            <Filter className="w-[16px]" />
          </div>
        </div>
      </div>

      {/* ---------- Search & Sort ---------- */}
      <div className="flex mt-5 items-center justify-between flex-wrap gap-3">
        <SearchInput value="" onChange={() => {}} />
        <div className="flex items-center gap-4 flex-wrap">
          <SortFilter />
          <LocationFilter />
        </div>
      </div>

      {/* ---------- Filter + Products ---------- */}
      <div className={`flex transition-all duration-300 mt-5 ${openFilter ? "gap-4" : ""}`}>
        {/* -------- Filter Sidebar -------- */}
        <div>
           <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            }}
            className={`transition-all duration-300 ease-in-out ${
              openFilter ? "w-[260px]" : "w-0"
            } overflow-hidden`}
          >
            {openFilter && (
              <div className="h-full flex flex-col gap-4 bg-[#fafafa] p-4">
                <h2 className="text-lg font-bold mb-2">Categories</h2>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.name;

                    return (
                      <div
                        key={index}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`flex items-center gap-2 p-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer group ${
                          isActive
                            ? "border-[#009c6d] bg-[#f3fdf8]"
                            : "border-gray-100"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full transition ${
                            isActive ? "bg-[#009c6d]/10" : "bg-[#f3fdf8]"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? "text-[#009c6d]" : "text-[#4b4b4b]"
                            }`}
                          />
                        </div>
                        <p
                          className={`text-[13px] font-medium ${
                            isActive ? "text-[#009c6d]" : "text-gray-700"
                          }`}
                        >
                          {category.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* -------- Products Grid -------- */}
        <div
          className={`flex-1 transition-all duration-300 grid grid-cols-1 sm:grid-cols-2 ${
            openFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-4`}
        >
          {isLoading || isFetching ? (
            // 🌀 Loading skeletons
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-48 w-full bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          ) : products.length > 0 ? (
            products.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                price={item.price}
                image={item.imageUrl?.[0]}
                description={item.description}
                location={item.location}
              />
            ))
          ) : (
            <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center">
              <Package className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-600">
                No products found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;