"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "../api/auth";
import { mutationOptions } from "@tanstack/react-query";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const registerApi = useRegisterUser()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const register = registerApi.mutateAsync({
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email
    })

    console.log("Signup details:", register);
    // send to API or backend here
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // next-auth: signIn("google")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join our marketplace to start buying and selling.
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignup}
          className="w-full cursor-pointer border border-gray-300 hover:bg-gray-50 transition py-2.5 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-medium"
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="FisrtName"
              placeholder="John Doe"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="John Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-green-600 cursor-pointer font-semibold hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;