"use client";

import React from "react";
import Link from "next/link";

const HeroPage = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-10 md:py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[30px] md:text-[50px] font-bold text-green-800 leading-tight mb-4">
            Fresh Farm Products <br /> Delivered to Your Doorstep
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Buy directly from trusted local farmers and food vendors on{" "}
            <span className="font-semibold text-green-700">Venyers Market</span>.
            Quality food, fair prices, and fast delivery.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              href="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-all"
            >
              Shop Now
            </Link>
            <Link
              href="/user-dashboard/store"
              className="border border-green-600 text-green-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all"
            >
              Become a Vendor
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://media.cntraveler.com/photos/5b86c3d8c2ca957cff4b496b/16:9/w_2560,c_limit/Oranjezicht%20City%20Farm%20-%20Market_2018_Ozcf-Market-Veg-Display.jpg" // 🧠 Replace with your image path
            alt="Farm products and food"
            className="rounded-2xl w-full h-[380px] object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroPage;