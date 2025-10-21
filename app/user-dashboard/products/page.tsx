"use client";
import React from "react";
import Link from "next/link";
import DashboardLayout from "@/app/components/DashboardLayout";
import { products } from "@/app/dummyData";
import { Edit2, Trash2 } from "lucide-react";
import DeleteModal from "./components/DeleteModal";

const Products = () => {
  const handleEdit = (id: number) => {
    console.log("Edit product:", id);
    // navigate or open modal to edit
  };

  const handleDelete = (id: number) => {
    console.log("Delete product:", id);
    // handle delete logic here
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">My Products</h1>

      {products.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center gap-4 mt-10 text-gray-500">
          <img src="https://assets.jijistatic.net/static/img/profile-redesign/adverts/no-adverts-images/no-adverts-active.svg" alt="" />
          You have no products listed.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
              }}
              className="p-5 space-y-2 rounded bg-white relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-2 h-[200px] w-full object-cover rounded"
              />
              <Link href={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold hover:text-green-600 transition">
                  {product.name}
                </h2>
              </Link>

              <div className="flex items-center gap-2">
                {/* <p className="text-[14px] text-[#555555] font-[600]">
                  Location:
                </p> */}
                <p className="text-[14px] font-[400] text-[#8b8b8b]">
                  {product.description.slice(0, 30)}...
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 mt-3">
                <DeleteModal>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="p-2 cursor-pointer rounded-full hover:bg-green-100 transition"
                    title="Edit"
                  >
                    <Edit2 size={18} className="text-green-600" />
                  </button>
                </DeleteModal>

                <DeleteModal onConfirm={() => handleDelete(product.id)}>
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