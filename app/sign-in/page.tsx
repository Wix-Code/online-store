"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
    // Here you'd handle your sign-in logic (API call or Firebase auth)
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Your Google OAuth login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="w-1/5 border-b border-gray-300"></span>
          <span className="text-gray-500 text-sm mx-2">or</span>
          <span className="w-1/5 border-b border-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/sign-up")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;