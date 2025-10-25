"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Save } from "lucide-react";

const Settings = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "08123456789",
    location: "Lagos, Nigeria",
    storeName: "JohnTech Gadgets",
  });

  const [avatar, setAvatar] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user:", user);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-6 bg-white md:p-6 rounded-2xl md:shadow-sm md:border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Edit Profile Settings
        </h1>

        {/* Profile Picture */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={avatar || "/images/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border border-gray-200"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-1 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 transition"
            >
              <Camera size={16} className="text-white" />
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {user.name}
            </h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Location
            </label>
            <Input
              type="text"
              name="location"
              value={user.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Store Name
            </label>
            <Input
              type="text"
              name="storeName"
              value={user.storeName}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;