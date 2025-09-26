import { Heart, RefreshCw, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  description: string;
  image?: string;
  price: number;
};

// Utility to slugify description safely
export const slugify = (text: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with -
    .replace(/(^-|-$)+/g, ""); // remove leading/trailing dashes
};

const CardItem = ({ id, description, image, price }: Props) => {
  const slug = slugify(description);

  return (
    <div className="group cursor-pointer flex flex-col space-y-2 rounded mb-4">
      <div className="flex gap-2 relative">
        {/* Product Image */}
        <img
          src={image || "/placeholder.png"}
          alt={description || "Product"}
          className="w-full h-[200px] object-cover mb-2"
        />

        {/* Hover icons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 text-[#555555]">
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

      {/* Product Title with URL like jiji */}
      <Link href={`/products/${id}-${slug}`}>
        <h2 className="text-[14px] text-[#333333] font-semibold hover:underline">
          {description}
        </h2>
      </Link>

      <p className="text-[14px] text-[#555555] font-[600]">₦{price.toLocaleString()}</p>
      <button className="text-[12px] text-black flex items-center gap-1 font-[600] cursor-pointer">
        <ShoppingCart className="w-[16px]" /> Add to cart
      </button>
    </div>
  );
};

export default CardItem;