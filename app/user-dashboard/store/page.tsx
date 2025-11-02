"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Store, MapPin, Loader2 } from "lucide-react";
import { useCreateStore } from "@/app/api/stores";

const EditStore = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const storeApi = useCreateStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      owner: "",
      imageUrl: "",
    },
  });

  // ✅ Check for token
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem("user-object") || "{}");

      await storeApi.mutateAsync({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl || "",
        location: data.location,
        owner: user?.id || 1, // fallback
      });

      alert("Store created successfully!");
      reset();
      setLoading(false)
    } catch (error) {
      console.error(error);
      alert("Failed to create store");
      setLoading(false)
    }
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-semibold mb-4 text-red-500">
          You must be registered before accessing this dashboard.
        </h1>
        <p className="text-gray-500">
          Please <a href="/" className="text-green-600 underline">go to the homepage</a> and log in first.
        </p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Store className="text-green-600" /> Add Store
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Store Name</label>
            <Input
              placeholder="Enter your store name"
              {...register("name", { required: "Store name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as string}
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
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="text-gray-400" size={18} />
              <label className="text-sm font-medium">Location</label>
            </div>
            <Input
              placeholder="Enter your store location"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message as string}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Store Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="text-gray-500 mb-2" size={28} />
              <p className="text-sm text-gray-500">Click to upload logo</p>
              <Input
                type="file"
                accept="image/*"
                {...register("imageUrl")}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={storeApi.isPending}
              className={`w-full text-white px-6 py-3 rounded-lg ${
                storeApi.isPending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditStore;