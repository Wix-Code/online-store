"use client";

import { useGetSavedProducts } from "@/app/api/savedProducts";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Bookmark, Loader2, MapPin, X } from "lucide-react";
import React from "react";

const saved = [
  {
    id: 1,
    name: "Banana",
    price: 14000,
    img: "https://res.cloudinary.com/devkpaapb/image/upload/v1763208149/zqy048e2flvwmiryw6nk.jpg",
    store: "Ugo Farms",
  },
  {
    id: 2,
    name: "Fresh Plantain",
    price: 9000,
    img: "https://via.placeholder.com/200",
    store: "FarmHub",
  },
];

const SavedPage = () => {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-object") || "{}") : {};
  const handleRemove = (id: number) => {
    console.log("Remove item:", id);
    // TODO: Call backend API → DELETE /saved/:id
  };

  const { data, isLoading } = useGetSavedProducts({
    page: 1,
    limit: 10
  })

  console.log(data, "data")
  return (
    <DashboardLayout>
      <div className="px-4 md:px-10 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl flex items-center gap-1 font-bold mb-5"> <Bookmark /> Saved Items</h1>
          <button className="text-[14px] hover:underline cursor-pointer text-green-500">Clear all</button>
        </div>

        {/* If empty */}
        {data?.data?.length === 0 && (
          <div className="w-full text-center py-20 text-gray-500">
            No saved items yet.
          </div>
        )}

        {/* Grid */}
        {
          isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-green-600 w-8 h-8" />
              </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {data?.data?.map((item) => (
                <div
                  key={item.id}
                  className="border-gray-200 border-[1px] rounded-md p-2 hover:shadow-sm transition flex justify-between  cursor-pointer"
                >
                  <div className="h-36 flex gap-2">
                    <img
                      src={item?.product?.imageUrl?.[0]}
                      alt={item?.product?.name}
                      className="object-cover w-[160px] h-full rounded-md"
                    />
                    <div className="flex-col flex justify-between">
                      <div>
                        <p className="font-medium text-sm line-clamp-2">{item?.product?.name}</p>
                        <p className="text-lg font-bold mt-1">₦{item?.product?.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">{item?.product?.store?.name}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#009c6d]" />
                        <span>{item?.product?.store?.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">          
                    <div className="float-right flex justify-right">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 text-right text-xs underline"
                      >
                        <X />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="w-[150px] cursor-pointer rounded-[4px] font-[600] text-[14px] py-[10px] border-[1px] border-green-500">Chat</button>
                      <button className="w-[150px] rounded-[4px] text-[14px] border-[1px] border-green-500 font-[600] cursor-pointer py-[10px] text-white bg-green-500">Show Contact</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </DashboardLayout>
  );
};

export default SavedPage;