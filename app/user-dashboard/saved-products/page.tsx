"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import { X } from "lucide-react";
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
  const handleRemove = (id: number) => {
    console.log("Remove item:", id);
    // TODO: Call backend API → DELETE /saved/:id
  };

  return (
    <DashboardLayout>
      <div className="px-4 md:px-10 py-6">
        <h1 className="text-2xl font-semibold mb-5">Saved Items</h1>

        {/* If empty */}
        {saved.length === 0 && (
          <div className="w-full text-center py-20 text-gray-500">
            No saved items yet.
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4">
          {saved.map((item) => (
            <div
              key={item.id}
              className="border-gray-200 rounded-md p-2 hover:shadow-sm transition flex justify-between  cursor-pointer"
            >
              <div className="h-36 flex gap-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-cover w-[160px] h-full rounded-md"
                />
                <div>
                  <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                  <p className="text-lg font-bold mt-1">₦{item.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.store}</p>
                </div>
              </div>

              <div className="">          
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 text-xs mt-2 underline"
                >
                  <X />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedPage;