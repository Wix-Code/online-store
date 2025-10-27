"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto overflow-hidden flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-8"
        >
          <img
            className="rounded-lg w-full object-cover shadow-md"
            src="https://pictures-nigeria.jijistatic.net/160598210_MzAwLTI3MC00NzlhY2Y4Yjdi.webp"
            alt="Contact Venyers"
          />

          <div className="space-y-4 text-gray-700">
            <h1 className="md:text-3xl text-[26px] font-bold text-green-700">Contact Us</h1>
            <p className="text-[15px] leading-relaxed">
              We’re always here to help! Whether you have a question about your
              account, a product listing, or anything else — our support team is
              happy to hear from you. You can reach us via email or simply fill
              out the contact form.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <p>dportas2@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <p>+234 812 682 9146</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full bg-white md:p-8 p-4 rounded-xl shadow-lg"
        >
          <h2 className="md:text-2xl text-[20px] font-semibold mb-6 text-gray-800">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-200 px-4 py-2.5 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="border border-gray-200 px-4 py-2.5 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Subject
              </label>
              <input
                type="text"
                className="border border-gray-200 px-4 py-2.5 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                placeholder="Order issue, refund, inquiry..."
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Message
              </label>
              <textarea
                className="border border-gray-200 p-3 w-full rounded-md resize-none h-[160px] focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide py-3 rounded-md transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;