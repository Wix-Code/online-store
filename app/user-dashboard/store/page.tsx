"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Store, MapPin, Loader2, X } from "lucide-react";
import { useCreateStore, useGetMyStore, useUpdateStore } from "@/app/api/stores";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { Stores } from "@/app/api/stores/types";
import { uploadToCloudinary } from "@/app/uploadImage";

type StoreForm = {
  name: string;
  description: string;
  location: string;
  owner: string;
  imageUrl: string;
};

const EditStore = () => {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [storeData, setStoreData] = useState<Stores | null>(null);

  const createStore = useCreateStore();
  const updateStore = useUpdateStore();
  const params = useParams();
  const storeId = params?.id ? Number(params.id) : null;

  const { data: storeResponse, isLoading: fetching } = useGetMyStore();

  console.log(storeResponse, "store update now");

  const store = storeResponse?.store;
  
  useEffect(() => {
    if (store) {
      setStoreData(store);
    }
  }, [store]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<StoreForm>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      owner: "",
      imageUrl: "",
    },
  });

  // ✅ Prefill when editing
  useEffect(() => {
    if (storeData?.id) {
      reset({
        name: storeData.name,
        description: storeData.description,
        location: storeData.location,
        owner: String(storeData.owner),
        imageUrl: storeData.imageUrl || "",
      });
      setPreview(storeData.imageUrl || null);
    }
  }, [storeData, reset]);

  // ✅ Handle file selection + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setValue("imageUrl", "");
  };

  const onSubmit = async (data: StoreForm) => {
    setLoading(true);
    try {
      const user =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user-object") || "{}")
          : {};

      let imageUrl = data.imageUrl;

      // ✅ Upload image to Cloudinary if a new file is selected
      if (selectedFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadToCloudinary(selectedFile);
          toast.success("Image uploaded successfully!");
        } catch (error: any) {
          toast.error(error.message || "Failed to upload image");
          setLoading(false);
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      const payload = {
        name: data.name,
        description: data.description,
        imageUrl: imageUrl || "",
        location: data.location,
        owner: user?.id || 1,
      };

      let response;
      if (storeData?.id) {
        // ✅ Update store
        response = await updateStore.mutateAsync({ id: storeData?.id, ...payload });
        toast.success(response?.data?.message || "Store updated successfully!");
      } else {
        // ✅ Create new store
        response = await createStore.mutateAsync(payload);
        setStoreData(response?.data?.store);
        toast.success(response?.data?.message || "Store created successfully!");
      }

      reset();
      setPreview(null);
      setSelectedFile(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-green-600 w-8 h-8" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Store className="text-green-600" />{" "}
          {storeData?.id ? "Edit Store" : "Add Store"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Store Name
            </label>
            <Input
              placeholder="Enter your store name"
              {...register("name", { required: "Store name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              rows={4}
              placeholder="Describe your store..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
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
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Store Logo
            </label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 relative"
              onClick={() => !uploadingImage && document.getElementById("store-logo")?.click()}
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : uploadingImage ? (
                <>
                  <Loader2 className="animate-spin text-green-600 mb-2" size={28} />
                  <p className="text-sm text-gray-500">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="text-gray-500 mb-2" size={28} />
                  <p className="text-sm text-gray-500">
                    Click to upload logo
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Max size: 5MB (JPG, PNG, GIF)
                  </p>
                </>
              )}
            </div>

            <Input
              id="store-logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className={`w-full flex cursor-pointer items-center justify-center text-white px-6 py-3 rounded-lg transition ${
                loading || uploadingImage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading || uploadingImage ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  {uploadingImage
                    ? "Uploading Image..."
                    : storeData?.id
                    ? "Updating Store..."
                    : "Creating Store..."}
                </>
              ) : storeData?.id ? (
                "Update Store"
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