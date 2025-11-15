"use client";

import React, { useState } from "react";
import { Filter, Package, Loader2, X } from "lucide-react";
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

  console.log(products, "products");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-green-600" size={60} />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ---------- Header Section ---------- */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">
          Discover fresh farm produce and quality products
        </p>
      </div>

      {/* ---------- Top Bar ---------- */}
      <div className="flex sm:flex-row bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 gap-4 sm:gap-0 items-center sm:items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{products.length}</span> of{" "}
          <span className="font-semibold text-gray-900">{data?.pages?.[0]?.data?.total ?? 0}</span> results
        </p>
        <button
          onClick={handleOpen}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200 font-medium"
        >
          {openFilter ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          <span>{openFilter ? "Close Filter" : "Open Filter"}</span>
        </button>
      </div>

      {/* ---------- Search & Sort ---------- */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput value="" onChange={() => {}} />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <SortFilter />
          <LocationFilter />
        </div>
      </div>

      {/* ---------- Filter + Products ---------- */}
      <div className="flex gap-0">
        {/* -------- Filter Sidebar -------- */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            openFilter ? "w-[280px]" : "w-0"
          } overflow-hidden`}
        >
          {openFilter && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Categories</h2>
                {activeCategory && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-xs cursor-pointer text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.name;

                  return (
                    <button
                      key={index}
                      onClick={() => handleCategorySelect(category.name)}
                      className={`w-full cursor-pointer flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-green-50 border-2 border-green-500 shadow-sm"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full transition-colors ${
                          isActive ? "bg-green-500" : "bg-white"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-gray-700"
                          }`}
                        />
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-green-700" : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* -------- Products Grid -------- */}
        <div className="flex-1">
          {isFetching && !isLoading ? (
            <div className="flex items-center justify-center h-[70vh]">
              <Loader2 className="animate-spin text-green-600" size={60} />
            </div>
          ) : products.length > 0 ? (
            <div
              className={`grid transition-all duration-300 ${
                openFilter
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              } gap-5`}
            >
              {products.map((item) => (
                <CardItem
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  image={item.imageUrl?.[0]}
                  description={item.description}
                  location={item.location}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              {(activeCategory) && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Load More Button */}
          {products.length > 0 && data?.pages?.[data.pages.length - 1]?.data?.hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetching}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Loading...
                  </>
                ) : (
                  "Load More Products"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;