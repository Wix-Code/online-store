"use client";

import React, { useState } from "react";
import { Users } from "lucide-react";
import DashboardLayout from "@/app/components/DashboardLayout";

const Followers = () => {
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  return (
    <DashboardLayout>
      <div>
        <div className="flex md:items-center w-full md:flex-row md:gap-0 gap-4 flex-col justify-between">
          <div className="flex items-center gap-2">
            <Users />
            <h1 className="text-xl font-bold">
              {activeTab === "followers" ? "My Followers" : "Following"}
            </h1>
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            <button
              onClick={() => setActiveTab("followers")}
              className={`md:w-[180px] h-[46px] border-green-500 cursor-pointer border-[1px] rounded-[8px] gap-2 transition
                ${
                  activeTab === "followers"
                    ? "bg-green-500 text-white"
                    : "bg-white text-[#555555] hover:text-white hover:bg-green-500"
                }`}
            >
              My Followers
            </button>

            <button
              onClick={() => setActiveTab("following")}
              className={`md:w-[180px] h-[46px] border-green-500 cursor-pointer border-[1px] rounded-[8px] gap-2 transition
                ${
                  activeTab === "following"
                    ? "bg-green-500 text-white"
                    : "bg-white text-[#555555] hover:text-white hover:bg-green-500"
                }`}
            >
              Following
            </button>
          </div>
        </div>

        {/* Section content */}
        <div className="mt-6">
          {activeTab === "followers" ? (
            <p>Showing all your followers...</p>
          ) : (
            <p>Showing people you follow...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Followers;