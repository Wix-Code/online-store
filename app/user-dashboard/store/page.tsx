"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Store, MapPin, Loader2 } from "lucide-react";
import { useCreateStore } from "@/app/api/stores";
import { toast } from "react-toastify";

const EditStore = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const storeApi = useCreateStore();

  const {
    register,
    handleSubmit,
    setValue,
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

  // ✅ Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthorized(!!token);
  }, []);

  // ✅ Handle file selection + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("imageUrl", String(file)); // store actual file for upload
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user-object") || "{}");

      const response = await storeApi.mutateAsync({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl || "",
        location: data.location,
        owner: user?.id || 1, // fallback
      });

      toast.success(response?.data?.message);
      reset();
      setPreview(null);
    } catch (error: any) {
      console.error(error);

      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "Something went wrong!");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🚫 Unauthorized message
  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-semibold mb-4 text-red-500">
          You must be registered before accessing this dashboard.
        </h1>
        <p className="text-gray-500">
          Please{" "}
          <a href="/" className="text-green-600 underline">
            go to the homepage
          </a>{" "}
          and log in first.
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
              {...register("description", {
                required: "Description is required",
              })}
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

          {/* ✅ Image Upload with Preview */}
          <div>
            <label className="block text-sm font-medium mb-2">Store Logo</label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 relative"
              onClick={() => document.getElementById("store-logo")?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              ) : (
                <>
                  <Upload className="text-gray-500 mb-2" size={28} />
                  <p className="text-sm text-gray-500">Click to upload logo</p>
                </>
              )}
            </div>

            <Input
              id="store-logo"
              type="file"
              accept="image/*"
              {...register("imageUrl")}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center text-white px-6 py-3 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Creating Store...
                </>
              ) : (
                "Create Store"
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditStore;