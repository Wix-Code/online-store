"use client";

import React from "react";
import { motion } from "framer-motion";
import { banner } from "@/app/dummyData";

const Banner = () => {
  return (
    <div className="py-8 px-4">
      <div className="max-w-[1000px] overflow-hidden m-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {banner.map((item) => (
          <motion.div
            key={item.id}
            className="overflow-hidden rounded-lg shadow-sm bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={item.image}
              alt={`Banner ${item.id}`}
              className="w-full h-[220px] md:h-[220px] object-cover rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Banner;