import { Heart, MapPin, ZoomIn } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  description: string;
  image?: string;
  price: number;
  location?: string; // 👈 added
};

// Utility to slugify description safely
export const slugify = (text: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with -
    .replace(/(^-|-$)+/g, ""); // remove leading/trailing dashes
};

const CardItem = ({ id, description, image, price, location }: Props) => {
  const slug = slugify(description);

  return (
    <div
      key={id}
      className="group cursor-pointer h-fit flex flex-col space-y-2 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 mb-4 overflow-hidden bg-white"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={image || "/placeholder.png"}
          alt={description || "Product image"}
          className="w-full h-[200px] object-cover"
        />

        {/* Hover icons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          <button
            title="Add to favorites"
            className="cursor-pointer bg-white p-1 rounded shadow hover:bg-gray-100"
          >
            <Heart className="w-[16px] text-gray-700" />
          </button>
          <button
            title="View product"
            className="cursor-pointer bg-white p-1 rounded shadow hover:bg-gray-100"
          >
            <ZoomIn className="w-[18px] text-gray-700" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-2 pb-3">
        <Link href={`/products/${id}-${slug}`}>
          <h2 className="text-[14px] text-[#444] font-medium hover:text-[#009c6d] transition-colors line-clamp-2">
            {description}
          </h2>
        </Link>

        <p className="text-[14px] text-[#009c6d] font-[600] mt-1">
          ₦{price?.toLocaleString()}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin className="w-[14px] h-[14px]" />
          <span>{location || "Dutse, Abuja FCT"}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;