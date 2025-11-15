"use client";
import React from "react";
import Link from "next/link";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import DeleteModal from "./components/DeleteModal";
import { useDeleteProduct, useGetMyProducts } from "@/app/api/products";
import { Product } from "@/app/api/products/types";

const Products = () => {
  const { data, isLoading } = useGetMyProducts();
  const { mutateAsync: deleteApi, isPending } = useDeleteProduct();

  const products = data?.products || [];

  const handleDelete = async (id: number) => {
    try {
      await deleteApi(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-green-500 w-10 h-10" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">My Products</h1>

      {products.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center gap-4 mt-10 text-gray-500">
          <img
            src="https://assets.jijistatic.net/static/img/profile-redesign/adverts/no-adverts-images/no-adverts-active.svg"
            alt="No products"
            className="w-[150px] h-[150px]"
          />
          <p>You have no products listed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product: Product) => (
            <div
              key={product.id}
              style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
              className="p-5 space-y-2 rounded bg-white relative"
            >
              <img
                src={String(product.imageUrl?.[0])}
                alt={product.name}
                className="mb-2 h-[200px] w-full object-cover rounded"
              />
              <Link href={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold hover:text-green-600 transition">
                  {product.name}
                </h2>
              </Link>

              <p className="text-sm text-gray-600">
                {product.description
                  ? `${product.description.slice(0, 40)}...`
                  : "No description"}
              </p>

              <div className="flex justify-end gap-3 mt-3">
                {/* Edit */}
                <button
                  onClick={() => console.log("Edit product:", product.id)}
                  className="p-2 cursor-pointer rounded-full hover:bg-green-100 transition"
                  title="Edit"
                >
                  <Edit2 size={18} className="text-green-600" />
                </button>

                {/* Delete */}
                <DeleteModal
                  loading={isPending}
                  onConfirm={() => handleDelete(product.id)}
                >
                  <button
                    className="p-2 cursor-pointer rounded-full hover:bg-red-100 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </DeleteModal>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Products;