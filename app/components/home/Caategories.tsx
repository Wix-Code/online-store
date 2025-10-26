"use client";

import React from "react";
import {
  Leaf,
  Wheat,
  Drumstick,
  Fish,
  Nut,
  Package,
  Milk,
  Sprout,
  Tractor,
} from "lucide-react";

export const categories = [
  { name: "Fresh Farm Produce", icon: Leaf },
  { name: "Grains & Cereals", icon: Wheat },
  { name: "Livestock & Poultry", icon: Drumstick },
  { name: "Fish & Seafood", icon: Fish },
  { name: "Nuts, Seeds & Oils", icon: Nut },
  { name: "Processed & Packaged Foods", icon: Package },
  { name: "Dairy & Animal Products", icon: Milk },
  { name: "Herbs & Natural Health", icon: Sprout },
  { name: "Farm Inputs & Equipment", icon: Tractor },
];

const Categories = () => {
  return (
    <section className="max-w-[1100px] mx-auto px-4 py-10">
      <h2 className="md:text-2xl text-[20px] bg-[#fdfdfd] py-2 border-y-[1px] w-fit border-[#e0e0e0] font-bold text-gray-800 mb-6">
        Shop by Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-5 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            >
              <div className="bg-[#f3fdf8] p-3 rounded-full mb-3 group-hover:bg-[#e6f9f0] transition">
                <Icon className="w-6 h-6 text-[#009c6d]" />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;