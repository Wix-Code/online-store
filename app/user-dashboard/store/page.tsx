"use client";

import React from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Store, MapPin, Phone, Mail } from "lucide-react";

const EditStore = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeName: "AbjonTech Store",
      description: "Your one-stop shop for tech gadgets and accessories.",
      location: "Lagos, Nigeria",
      phone: "+2348123456789",
      email: "store@example.com",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Updated store info:", data);
    alert("Store information updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Store className="text-green-600" /> Edit Store
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Store Name</label>
            <Input
              placeholder="Enter your store name"
              {...register("storeName", { required: "Store name is required" })}
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeName.message as string}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              rows={4}
              placeholder="Describe your store..."
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message as string}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-400" size={18} />
              <label className="block text-sm font-medium mb-1">Location</label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter your store location"
                {...register("location", { required: "Location is required" })}
              />
            </div>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message as string}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="text-gray-400" size={18} />
                <label className="block text-sm font-medium mb-1">Phone</label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter store phone number"
                  {...register("phone", { required: "Phone number is required" })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="text-gray-400" size={18} />
                <label className="block text-sm font-medium mb-1">Email</label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter store email"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Store Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="text-gray-500 mb-2" size={28} />
              <p className="text-sm text-gray-500">Click to upload logo</p>
              <Input type="file" accept="image/*" className="hidden" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 cursor-pointer hover:bg-green-700 w-full text-white px-6 py-3 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditStore;