"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "../api/auth";
import { toast } from "react-toastify";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
  });

  const { mutateAsync: registerApi, isPending } = useRegisterUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await registerApi({
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender
      });

      toast.success("Sign up successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
      });
      router.push("/sign-in");
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // next-auth: signIn("google")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-gray-600">
            Join our marketplace to start buying and selling
          </p>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full cursor-pointer border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all py-3 rounded-lg flex items-center justify-center gap-3 text-gray-700 font-medium shadow-sm hover:shadow"
        >
          <FcGoogle size={24} />
          Sign up with Google
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+234 812 689 2083"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 pr-12 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full mt-6 cursor-pointer flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-green-600 cursor-pointer font-semibold hover:text-green-700 hover:underline transition-colors"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;