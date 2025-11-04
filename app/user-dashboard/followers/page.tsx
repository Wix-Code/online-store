"use client";

import React, { useState } from "react";
import { Loader2, Users } from "lucide-react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { useGetUserFollowers, useGetUserFollowing, useUnfollowUser } from "@/app/api/follows";
import Link from "next/link";

const Followers = () => {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-object") || "{}") : {};
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  const {
    data: followersData,
    isLoading: followersLoading,
  } = useGetUserFollowers(Number(user?.id));

  const {
    data: followingData,
    isLoading: followingLoading,
  } = useGetUserFollowing(Number(user?.id));

  const {mutateAsync: unfollowApi, isPending } = useUnfollowUser()

  const followers = followersData?.data || [];
  const following = followingData?.data || [];

  const handleUnfollow = (userId: number) => {
    unfollowApi({
      followerId: Number(user?.id),
      followingId: Number(userId)
    })
    console.log("Unfollow user:", userId);
  };

  const data = activeTab === "followers" ? followers : following;
  const isLoading = activeTab === "followers" ? followersLoading : followingLoading;

  return (
    <DashboardLayout>
      <div className="px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex md:items-center w-full md:flex-row md:gap-0 gap-4 flex-col justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-green-500" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {activeTab === "followers" ? "My Followers" : "Following"}
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex md:flex-row flex-col gap-3">
            <button
              onClick={() => setActiveTab("followers")}
              className={`md:w-[180px] h-[46px] cursor-pointer border-green-500 border rounded-[8px] transition font-medium
                ${
                  activeTab === "followers"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:text-white hover:bg-green-500"
                }`}
            >
              My Followers
            </button>

            <button
              onClick={() => setActiveTab("following")}
              className={`md:w-[180px] h-[46px] cursor-pointer border-green-500 border rounded-[8px] transition font-medium
                ${
                  activeTab === "following"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:text-white hover:bg-green-500"
                }`}
            >
              Following
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-8">
          {isLoading ? (
            <div className="h-[60vh] flex item-center justify-center"><Loader2 className="animate-spin text-green-500 w-10 h-10" /></div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center flex-col gap-1">
              <img src="https://st2.depositphotos.com/47577860/46186/v/450/depositphotos_461864526-stock-illustration-approve-approved-friend-accept-icon.jpg" className="w-[150px]" alt="" />
              <p className="text-gray-500 text-center py-10">
                {activeTab === "followers"
                  ? "You don’t have any followers yet."
                  : "You’re not following anyone yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-col-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-xl hover:shadow-sm p-4 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcsH3mGczZn7TQhsQuNClWKOWeyTffMKlxQ&s"} // ✅ fallback image
                      alt={user.firstName || "User"}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div>
                      <Link href={`/stores/${user?.id}`} className="font-semibold text-green-800">
                        {user.firstName} {user.lastName}
                      </Link>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {/* Unfollow Button */}
                  {activeTab === "following" && (
                    <button
                      onClick={() => handleUnfollow(user.id)}
                      className="px-3 py-1 text-sm text-green-500 flex items-center justify-center rounded-md border border-green-500 hover:bg-green-500 hover:text-white cursor-pointer transition"
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin inline-block w-3 h-3 text-green-100" />
                      ) : (
                        "Unfollow"
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Followers;