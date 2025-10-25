"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import LocationFilter from "../components/stores/LocationFilter";
import SearchInput from "../components/SearchInput";
import SortFilter from "../components/SortFilter";
import { useGetAllStores } from "../api/stores";
import { slugify } from "../components/CardItem";

const Page = () => {
  const { data, isLoading } = useGetAllStores({
    search: undefined,
    sort: undefined,
    location: undefined,
  });

  const stores = data?.pages?.flatMap((page) => page.data.stores) || [];

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Stores</h1>
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value="" onChange={() => {}} />
          <LocationFilter />
          <SortFilter />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="p-4 space-y-2 rounded-lg animate-pulse border border-gray-200 bg-gray-50"
            >
              <div className="h-[180px] bg-gray-200 rounded-md" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : stores.length === 0 ? (
        // Empty State
        <div className="text-center py-16">
          <Search className="mx-auto mb-4 text-gray-400 w-10 h-10" />
          <h3 className="text-lg font-medium text-gray-700">
            No stores found
          </h3>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        // Store Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stores.map((store) => {
            const slug = slugify(store.name);
            return (
              <div
                key={store.id}
                className="p-4 space-y-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  loading="lazy"
                  className="h-[200px] w-full object-cover rounded-md"
                />
                <Link href={`/stores/${store.id}-${slug}`}>
                  <h2 className="text-base font-semibold text-gray-800 hover:text-[#009c6d] transition-colors">
                    {store.name}
                  </h2>
                </Link>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 font-medium">
                    Location:
                  </p>
                  <p className="text-sm text-gray-500">{store.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;