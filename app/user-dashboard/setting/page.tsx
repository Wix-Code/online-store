"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Save, Loader2 } from "lucide-react";
import { useGetUserProfile, useUpdateUser } from "@/app/api/auth";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    storeName: "",
    gender: ""
  });

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { mutateAsync: updateApi, isPending } = useUpdateUser();
  const { isLoading, data } = useGetUserProfile();

  // ✅ Auto-fill form when data is loaded
  useEffect(() => {
    if (data?.user) {
      const userData = data.user;
      const store = userData.stores?.[0]; // Get first store if exists

      setUser({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: store?.location || "",
        storeName: store?.name || "",
        gender: userData?.gender || "",
      });

      // Set avatar if exists
      if (userData.avatar) {
        setAvatar(userData.avatar);
      }
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Build update object with only non-empty values
      const updateData: any = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      // Only add optional fields if they have values
      if (user.phone && user.phone.trim() !== "") {
        updateData.phone = user.phone;
      }
      if (user.gender && user.gender.trim() !== "") {
        updateData.gender = user.gender;
      }
      if (user.location && user.location.trim() !== "") {
        updateData.location = user.location;
      }
      if (user.storeName && user.storeName.trim() !== "") {
        updateData.storeName = user.storeName;
      }

      console.log("Sending payload:", updateData);

      // If you need to upload avatar with FormData
      if (avatarFile) {
        const formData = new FormData();
        // Object.keys(updateData).forEach(key => {
        //   formData.append(key, updateData[key]);
        // });
        // formData.append("avatar", avatarFile);
        // await updateApi({ ...formData });
      } else {
        // Send as JSON
        await updateApi(updateData);
      }
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
      </DashboardLayout>
    );
  }

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
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
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
                required
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
                placeholder="+234 800 000 0000"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Location
              </label>
              <Input
                type="text"
                name="location"
                value={user.location}
                onChange={handleChange}
                placeholder="e.g., Lagos, Nigeria"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="gender">
                Gender
              </label>
              <Select value={user.gender} onValueChange={(value) => setUser({ ...user, gender: value })}>
                <SelectTrigger className="w-full h-[50px]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
              placeholder="Your store name"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center py-6 cursor-pointer gap-2 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;