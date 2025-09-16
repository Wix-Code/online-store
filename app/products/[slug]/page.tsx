"use client";

import { useGetProductById } from "@/app/api/products";
import { Heart, Minus, Plus, RefreshCw } from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

export default function SingleItem({ params }: Props) {
  // params.slug looks like "2-red-palm-oil"
  const productId = Number(params.slug.split("-")[0]);

  const { data, isLoading, error } = useGetProductById(productId);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error || !data) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const product = data.product;
  console.log(data, "data");
  console.log(product, "product");

  return (
    <div className="p-6">
      <div className="flex max-w-[1000px] m-auto gap-4">
        <div className="flex-[50%]">
          <img
            className="w-[100%]"
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
          />
        </div>
        <div className="flex-[50%] space-y-4">
          <p className="text-[30px] font-[400]">{product.name}</p>
          <div className="flex items-center gap-1">
            <p className="text-[26px] text-[#009c6dfa] font-[400]">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
          <p className="text-[12px] text-[#555555] font-[400]">
            {product.description}
          </p>
          <div className="items-center gap-2 flex">
            <div className="flex py-2.5 items-center gap-2">
              <button className="h-[40px] px-2.5 bg-[#fcfcfc] border border-[#f5f5f5]">
                <Minus className="w-[12px]" />
              </button>
              <p className="text-[#555555] text-[14px]">0</p>
              <button className="h-[40px] px-2.5 bg-[#fcfcfc] border border-[#f5f5f5]">
                <Plus className="w-[12px]" />
              </button>
            </div>
            <button className="text-white uppercase bg-black px-5.5 h-[40px] text-[12px] font-[400]">
              Add to cart
            </button>
          </div>
          <button className="text-[#555555] flex gap-2 items-center text-[12px]">
            <Heart className="w-[16px]" /> Add to wishlist
          </button>
          <button className="text-[#555555] flex gap-2 items-center text-[12px]">
            <RefreshCw className="w-[16px]" /> Add to compare
          </button>
        </div>
      </div>
    </div>
  );
}