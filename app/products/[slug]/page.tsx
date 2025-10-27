"use client";

import { useGetProductById } from "@/app/api/products";
import ItemCard from "@/app/components/ItemCard";
import { products } from "@/app/dummyData";
import { CameraIcon, ChevronLeft, ChevronRight, Eye, Heart, MapPin } from "lucide-react";
import { useState, use } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function SingleItem({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [showContact, setShowContact] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  const productId = Number(resolvedParams.slug.split("-")[0]);
  const { data, isLoading, error } = useGetProductById(productId);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error || !data) return <p className="text-center text-red-500">Product not found</p>;

  const product = data.product;

  const images = [
    product.imageUrl || "/placeholder.png",
    "https://pictures-nigeria.jijistatic.net/181275610_MzAwLTQwMC0wNzAwZTlhYWFh.webp",
    "https://pictures-nigeria.jijistatic.net/181275610_MzAwLTQwMC0wNzAwZTlhYWFh.webp",
    "https://pictures-nigeria.jijistatic.net/181275610_MzAwLTQwMC0wNzAwZTlhYWFh.webp",
    "https://pictures-nigeria.jijistatic.net/181275610_MzAwLTQwMC0wNzAwZTlhYWFh.webp",
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row max-w-[1100px] m-auto gap-6">
        {/* Left Section */}
        <div className="flex-[70%] overflow-hidden w-full">
          {/* Main Image Slider */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Thumbs]}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              thumbs={{ swiper: thumbsSwiper }}
              className="mb-3 rounded-md"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <img
                      className="w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px] object-cover rounded-md"
                      src={img}
                      alt={product.name}
                    />
                    <p className="w-10 h-7 text-[14px] justify-center gap-1 text-gray-800 flex items-center shadow-md bg-[#ffffff] top-1 left-1 absolute">
                      <CameraIcon size={16} /> {images.length}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ✅ Custom Navigation Buttons */}
            <button
              onClick={() => mainSwiper?.slidePrev()}
              className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer bg-white/80 hover:bg-white text-gray-800 p-2 md:p-4 rounded-full shadow-md z-10 transition"
            >
              <ChevronLeft className="text-green-500" size={26} />
            </button>
            <button
              onClick={() => mainSwiper?.slideNext()}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-white/80 hover:bg-white text-green-800 p-2 md:p-4 rounded-full shadow-md z-10 transition"
            >
              <ChevronRight className="text-green-500" size={26} />
            </button>
          </div>

          {/* Thumbnail Slider */}
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="flex justify-center sm:justify-start my-2 gap-2 sm:gap-3"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <img
                  className={`w-[120px] sm:w-[150px] md:w-[180px] h-[120px] sm:h-[150px] md:h-[180px] object-cover rounded-md cursor-pointer border-2 ${
                    index === activeIndex ? "border-green-500" : "border-transparent"
                  } hover:opacity-80`}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => {
                    mainSwiper.slideTo(index);
                    setActiveIndex(index);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Product Details */}
          <div className="w-full bg-[#fafafa] border flex flex-col space-y-7 p-4 border-[#f5f5f5] rounded-md">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
                <p className="text-[22px] sm:text-[28px] md:text-[30px] font-[600]">{product.name}</p>
                <button className="text-[#555] flex gap-2 items-center text-[13px] sm:text-[12px]">
                  <Heart className="w-[16px]" /> Add to wishlist
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-3 text-[#555555] text-[12px]">
                <p className="flex items-center gap-1 font-[400]">
                  <MapPin className="w-[18px]" /> {product.location || "Lagos, Ojo, 1 hour ago"}
                </p>
                <p className="flex items-center gap-1 font-[400]">
                  <Eye className="w-[18px]" /> 9 views
                </p>
              </div>
            </div>

            <div className="space-y-3 border-y py-3 border-[#b6b6b6]">
              <p className="font-semibold text-[15px]">Store Address</p>
              <div className="space-y-1">
                <p className="text-[14px] flex items-center gap-1 text-[#555555] font-[600]">
                  <MapPin className="w-[18px]" /> {product.location || "Lagos, Ojo"}
                </p>
                <p className="text-[14px] text-[#555555] font-[400]">
                  2 Ajibola Crescent, Ketu, Alapere Bustop
                </p>
              </div>
            </div>

            <p className="text-[15px] md:text-[16px] text-[#555555] font-[400] leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 flex flex-col">
              <button
                onClick={() => setShowContact(!showContact)}
                className="w-full sm:w-[300px] h-[46px] border-green-500 cursor-pointer border rounded-[4px] gap-2 text-[#fff] bg-green-500 hover:bg-green-600 transition"
              >
                {showContact ? "Hide Number" : "Show Number"}
              </button>
              {showContact && (
                <a href={`tel:${"08126829146"}`} className="text-[16px] text-[#555555] font-[400]">
                  08126829146
                </a>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-6 mt-10">
            <p className="font-[600] text-[20px] sm:text-[24px] md:text-[28px] mb-6 border-y border-[#e0e0e0] w-fit pb-1">
              Related Products
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {products.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-[30%] w-full lg:w-auto space-y-4">
          <div className="w-full bg-[#fafafa] border flex flex-col space-y-2 p-4 border-[#f5f5f5] rounded-md">
            <p className="text-[26px] sm:text-[28px] text-[#009c6dfa] font-[600]">
              ₦{product.price.toLocaleString()}
            </p>
          </div>

          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
            className="w-full bg-[#fafafa] border flex flex-col items-center sm:items-start space-y-3 p-4 border-[#f5f5f5] rounded-md"
          >
            <img
              className="w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] object-cover rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBzvBsz2tDOPYmPViLHh1avwrDCrQs2NX2Q&s"
              alt="Store Name"
            />
            <p className="text-[15px] sm:text-[16px] font-[600]">Ugo Farms</p>
            <p className="text-[12px] font-[400]">6y 1m on Jiji</p>
            <div className="space-y-2 w-full">
              <a
                href="https://wa.me/2348125352020"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[46px] gap-2 rounded-[8px] bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-[20px]" />
                Chat Vendor
              </a>
              <a
                href="tel:08125352020"
                className="w-full h-[46px] gap-2 rounded-[8px] bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-[20px]" />
                Call Vendor
              </a>
            </div>
          </div>

          <div className="w-full bg-[#fafafa] border flex flex-col space-y-2 p-4 border-[#f5f5f5] rounded-md">
            <p className="text-[16px] text-center text-[#000000] font-[600]">Safe Tips</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li className="text-[14px] text-[#555555] font-[400]">
                Avoid paying in advance, even for delivery
              </li>
              <li className="text-[14px] text-[#555555] font-[400]">
                Meet with the seller at a safe public place
              </li>
              <li className="text-[14px] text-[#555555] font-[400]">
                Inspect the item and ensure it's exactly what you want
              </li>
              <li className="text-[14px] text-[#555555] font-[400]">
                Make sure that the packed item is the one you've inspected
              </li>
              <li className="text-[14px] text-[#555555] font-[400]">Only pay if you're satisfied</li>
            </ul>
          </div>

          <div className="w-full bg-[#fafafa] border flex flex-col p-4 border-[#f5f5f5] rounded-md">
            <button className="w-full h-[46px] border-green-500 border rounded-[8px] bg-white text-[#555555] hover:text-white hover:bg-green-500 transition">
              Post Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}