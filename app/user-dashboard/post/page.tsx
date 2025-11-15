"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Trash2, Upload, Loader2 } from "lucide-react";
import { useCreateProduct } from "@/app/api/products";
import { uploadToCloudinary } from "@/app/uploadImage";
import { toast } from "react-toastify";
import CategoryModal from "@/app/CategoryModal";

const Post = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    categoryId: "", // Changed from category to categoryId
    categoryName: "", // Store name for display
    location: "",
    description: "",
    phone: "",
  });

  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  console.log(token, "token")
  const { mutateAsync: createProductApi, isPending } = useCreateProduct();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (categoryId: string, categoryName: string) => {
    setProduct({ ...product, categoryId, categoryName });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles: File[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const newImages = [...images, ...validFiles];
    setImages(newImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!product.name || !product.price || !product.categoryId || !product.location || !product.phone || !product.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    try {
      setUploadingImages(true);

      const imageUrls: string[] = [];
      
      for (let i = 0; i < images.length; i++) {
        setUploadProgress(`Uploading image ${i + 1} of ${images.length}...`);
        
        try {
          const imageUrl = await uploadToCloudinary(images[i]);
          imageUrls.push(imageUrl);
        } catch (error: any) {
          toast.error(`Failed to upload image ${i + 1}: ${error.message}`);
          setUploadingImages(false);
          setUploadProgress("");
          return;
        }
      }

      toast.success("All images uploaded successfully!");
      setUploadProgress("Creating product...");

      const user =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user-object") || "{}")
          : {};

      // Create product with categoryId instead of category name
      const productData = {
        name: product.name,
        price: parseFloat(product.price),
        categoryId: Number(product.categoryId), // Send categoryId to API
        location: product.location,
        description: product.description,
        phone: product.phone,
        imageUrl: imageUrls,
        storeId: user?.stores?.[0]?.id || null,
        userId: user?.id || null,
      };

      const response = await createProductApi(productData);
      
      toast.success(response?.data?.message || "Product posted successfully!");

      // Reset form
      setProduct({
        name: "",
        price: "",
        categoryId: "",
        categoryName: "",
        location: "",
        description: "",
        phone: ""
      });
      setImages([]);
      setPreviews([]);
      
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.error || error.message || "Failed to create product");
    } finally {
      setUploadingImages(false);
      setUploadProgress("");
    }
  };

  console.log(token, "token")
  console.log("We are good")

  const isSubmitting = isPending || uploadingImages;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto mt-6 bg-white md:p-6 rounded-2xl md:shadow-sm md:border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              Product Images *
            </label>
            <div className="flex flex-wrap gap-3">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden group"
                >
                  <img
                    src={preview}
                    alt={`Product ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={isSubmitting}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <label
                htmlFor="images"
                className={`w-32 h-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-green-500 transition ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ImagePlus size={26} className="text-gray-500" />
                <span className="text-sm text-gray-500 mt-1">Upload</span>
                <span className="text-xs text-gray-400">Max 5MB</span>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                />
              </label>
            </div>
            {images.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {images.length} image{images.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* Product Info */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Product Name *
            </label>
            <Input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Fresh Palm Oil 25L"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Price (₦) *
              </label>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="e.g. 12000"
                required
                disabled={isSubmitting}
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Category *
              </label>
              <CategoryModal
                value={product.categoryId}
                onChange={handleCategoryChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Location *
            </label>
            <Input
              type="text"
              name="location"
              value={product.location}
              onChange={handleChange}
              placeholder="e.g. Lagos, Alaba"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Contact Number *
            </label>
            <Input
              type="tel"
              name="contact"
              value={product.phone}
              onChange={handleChange}
              placeholder="e.g. 08123456789"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Product Description *
            </label>
            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Describe your product here..."
              className="min-h-[120px]"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Upload Progress */}
          {uploadProgress && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin text-blue-600" size={18} />
                <span className="text-sm text-blue-700">{uploadProgress}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {uploadingImages ? "Uploading..." : "Posting..."}
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Post Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Post;