"use client"

import DashboardLayout from "@/app/components/DashboardLayout";
import { Bell, Clock, Loader2, Trash2 } from "lucide-react";
import React from "react";
import DeleteModal from "./components/DeleteModal";
import { useGetNotificationsByUserId, useMarkAllNotificationAsRead, useMarkNotificationAsRead } from "@/app/api/notifications";
import { formatTimeAgo } from "@/app/components/format";

// const notifications = [
//   {
//     id: 1,
//     title: "New message from buyer",
//     description: "Someone just sent you a message regarding your listed product.",
//     time: "2 hours ago",
//     read: false,
//   },
//   {
//     id: 2,
//     title: "Product approved",
//     description: "Your product 'iPhone 13 Pro Max' has been approved and is now live.",
//     time: "Yesterday",
//     read: true,
//   },
//   {
//     id: 3,
//     title: "Promotion expiring soon",
//     description: "Your premium ad will expire in 3 days. Renew to stay on top.",
//     time: "2 days ago",
//     read: true,
//   },
// ];

const Notifications = () => {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-object") || "{}") : {};

  const { data, isLoading } = useGetNotificationsByUserId(user?.id)

  const unReadNotifications = data?.data?.unreadCount ?? 0

  const { mutateAsync: markAsRead, isPending } = useMarkNotificationAsRead()
  
  const markNotificationAsRead = (id: number) => {
    markAsRead(id)
  }

  const { mutateAsync: markAllAsRead, isPending: loading } = useMarkAllNotificationAsRead()
  
  const markAllNotificationsAsRead = (id: number) => {
    markAllAsRead(id)
  }

  const notifications = data?.data?.notifications

  const { mutateAsync: deleteNotificationId, isPending: load } = useMarkNotificationAsRead()
  
  const deleteNotification = (id: number) => {
    deleteNotificationId(id)
  }

  console.log(data?.data?.notifications)
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Bell className="text-green-500" /> My Notifications
        </h1>
        <button onClick={() => markAllNotificationsAsRead(user?.id)} className={`text-sm ${unReadNotifications === 0 ? "text-gray-300 cursor-not-allowed" : "text-green-500 cursor-pointer"} flex items-center justify-center hover:underline`}>
          { loading ? <Loader2 className="animate-spin text-green-500 w-5 h-5" /> : "Mark all as read"}
        </button>
      </div>

      {
        isLoading ? (<div className="h-[60vh] flex item-center justify-center"><Loader2 className="animate-spin text-green-500 w-10 h-10" /></div>): (
          <>
            {notifications?.length === 0 ? (
              <div className="text-center flex flex-col items-center justify-center gap-4 mt-10 text-gray-500">
                <img src="https://assets.jijistatic.net/static/img/profile-redesign/adverts/no-adverts-images/no-adverts-active.svg" alt="" />
                You have no notifications yet.
              </div>
            ) : (
              <div className="space-y-3">
                {notifications?.map((n) => (
                  <div
                    key={n.id}
                    className={`flex justify-between items-start p-4 rounded-lg border ${
                      n?.isRead === true ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div>
                      <h2
                        className={`font-semibold ${
                          n?.isRead === true ? "text-gray-800" : "text-green-800"
                        }`}
                      >
                        {n?.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">{n?.message}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-2 gap-1">
                        <Clock size={12} />
                        {formatTimeAgo(n?.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                      <div className="flex items-center gap-[4px]">
                        <button
                          className={`text-[12px] hover:underline disabled:opacity-50 
                            ${n.isRead ? "text-gray-300 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
                          onClick={() => markNotificationAsRead(Number(n?.id))}
                          disabled={isPending || n.isRead} // disable when already read or loading
                        >
                          {isPending ? (
                            <Loader2 className="animate-spin inline-block w-4 h-4 text-green-500" />
                          ) : (
                            "Mark as read"
                          )}
                        </button>
                        {isPending && (
                          <Loader2 className="animate-spin text-green-500 w-4 h-4" />
                        )}
                      </div>
                      <DeleteModal onDelete={() => deleteNotification(n?.id)} load={load}>
                        <button
                          className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                          title="Delete notification"
                        >
                          <Trash2 size={16} />
                        </button>
                      </DeleteModal>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )
      }
    </DashboardLayout>
  );
};

export default Notifications;