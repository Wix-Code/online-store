"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, ShoppingBag, Globe } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          About <span className="text-yellow-300">Venyers</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-100">
          Empowering local buyers and sellers with a trusted, simple, and fast
          online marketplace experience.
        </p>
      </section>

      {/* Mission & Story */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Venyers was born out of a vision to bridge the gap between buyers
              and sellers across Africa, starting from Nigeria. We realized how
              difficult it can be for people to find trusted products and
              services locally — so we built Venyers to make trading simple,
              safe, and fast.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a digital marketplace that connects millions of people,
              helping small businesses grow while offering buyers quality and
              trust in every transaction.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be Africa’s most trusted and innovative online marketplace,
              where trade meets transparency and opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-100 py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <ShieldCheck className="w-10 h-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg">Trust</h3>
              <p className="text-gray-500 text-sm mt-2">
                Every transaction on Venyers is secure and verified to ensure
                peace of mind for both buyers and sellers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <ShoppingBag className="w-10 h-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg">Simplicity</h3>
              <p className="text-gray-500 text-sm mt-2">
                A simple interface that helps you buy and sell anything easily,
                without stress or confusion.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Users className="w-10 h-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg">Community</h3>
              <p className="text-gray-500 text-sm mt-2">
                Venyers is more than a marketplace — it’s a growing network of
                people supporting each other.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Globe className="w-10 h-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg">Innovation</h3>
              <p className="text-gray-500 text-sm mt-2">
                We continuously improve our technology to bring a better trading
                experience to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Get in Touch
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Have questions or feedback? We’d love to hear from you.  
          Reach out to us via email or social platforms below.
        </p>
        <div className="flex justify-center space-x-6 text-green-600 font-medium">
          <a href="mailto:support@venyers.com" className="hover:underline">
            support@venyers.com
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;