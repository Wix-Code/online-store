"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    // Here you'd call your API to send a password reset email
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
          Forgot Password 🔑
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your registered email"
                className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white cursor-pointer font-semibold rounded-xl hover:bg-green-700 transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/sign-in")}
            className="text-green-600 cursor-pointer hover:underline text-sm font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;