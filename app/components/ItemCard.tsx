import { MapPin, Heart, ZoomIn } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  description: string;
  image: string;
  price: number;
  location?: string;
};

const ItemCard = ({ id, description, image, price, location }: Props) => {
  return (
    <div
      key={id}
      className="group flex flex-col gap-2 cursor-pointer rounded-lg border border-[#f1f1f1] p-2 shadow-sm hover:shadow-md transition-all duration-300 md:mb-4 bg-white"
    >
      {/* Product Image */}
      <div className="relative w-full h-[200px] overflow-hidden rounded-md">
        <img
          src={image}
          alt={description}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <Link href={`/products/${id}`}>
          <h2 className="text-[14px] text-[#444] font-medium hover:text-[#009c6d] transition-colors line-clamp-2">
            {description}
          </h2>
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[#009c6d] font-semibold">₦{price?.toLocaleString()}</p>

          {/* Hover Icons */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-[#555]">
            <button className="cursor-pointer bg-[#fcfcfc] p-1 shadow-sm rounded">
              <Heart className="w-[16px]" />
            </button>
            <button className="cursor-pointer bg-[#fcfcfc] p-1 shadow-sm rounded">
              <ZoomIn className="w-[18px]" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-2 text-[13px] text-gray-600">
          <MapPin className="w-4 h-4 text-[#009c6d]" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;