"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const InfoCard = () => {
  return (
    <div className="bg-[#7fdac611] py-6 px-4">
      <div className="max-w-[1000px] overflow-hidden flex flex-col md:flex-row items-center gap-10 m-auto">
        {/* Left Section (Text) */}
        <motion.div
          className="flex-1 space-y-4 text-center md:text-left"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-[30px] md:text-[38px] leading-tight font-[800]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            A Variety of Stores to choose from
          </motion.p>
          <p className="text-[16px] md:text-[20px] mb-6 text-[#555555]">
            Order food from the best restaurants, local favorites, and online
            vendors using the app or web.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/products"
              className="inline-block bg-[#000000] px-8 py-4 text-[#FFFFFF] text-[14px] font-[600] rounded-md hover:bg-[#333] transition"
            >
              Order now!
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section (Image) */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="https://cdn.prod.website-files.com/65e8c28f089978cd40da4f5c/66c62cc20f8b19a270824aee_Local%20Line%20Blog%20Feature%20Image_Offer%20Home%20Delivery%20For%20Your%20Farm.webp"
            alt="Store variety"
            className="w-full h-[280px] md:h-[400px] object-cover rounded-lg shadow-md"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InfoCard;