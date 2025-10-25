"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Trash2, Upload } from "lucide-react";

const Post = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    location: "",
    description: "",
    contact: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting product:", product);
    console.log("Images:", images);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto mt-6 bg-white md:p-6 rounded-2xl md:shadow-sm md:border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              Product Images
            </label>
            <div className="flex flex-wrap gap-3">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden group"
                >
                  <img
                    src={preview}
                    alt="Product"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <label
                htmlFor="images"
                className="w-32 h-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-green-500 transition"
              >
                <ImagePlus size={26} className="text-gray-500" />
                <span className="text-sm text-gray-500 mt-1">Upload</span>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Product Name
            </label>
            <Input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Fresh Palm Oil 25L"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Price (₦)
              </label>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="e.g. 12000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Category
              </label>
              <Input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="e.g. Foodstuff, Electronics"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Location
            </label>
            <Input
              type="text"
              name="location"
              value={product.location}
              onChange={handleChange}
              placeholder="e.g. Lagos, Alaba"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Contact Number
            </label>
            <Input
              type="tel"
              name="contact"
              value={product.contact}
              onChange={handleChange}
              placeholder="e.g. 08123456789"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Product Description
            </label>
            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Describe your product here..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              <Upload size={16} />
              Post Product
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Post;