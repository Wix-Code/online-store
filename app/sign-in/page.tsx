"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginUser } from "../api/auth";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginApi = useLoginUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

  try {
    // ✅ Wait for the API call to resolve
    const login = await loginApi.mutateAsync({
      email: form.email,
      password: form.password,
    });

    console.log("Login Data:", login);

    // ✅ Show success toast
    toast.success(login?.data?.message || "Login successful!");

    // Optionally, store token or navigate
    localStorage.setItem("token", login?.data?.token);
    localStorage.setItem("user-object", JSON.stringify(login?.data?.user));
    router.push("/user-dashboard/post");
    setLoading(false)

  } catch (error: any) {
    console.error("Login error:", error);

    // ✅ Show error toast
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Login failed. Please try again.";
    toast.error(errorMsg);
    setLoading(false)
  }
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
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="w-full border-b border-gray-300"></span>
          <span className="text-gray-500 text-sm mx-2">or</span>
          <span className="w-full border-b border-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/sign-up")}
            className="text-green-600 cursor-pointer hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;