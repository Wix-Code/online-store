import DashboardLayout from "@/app/components/DashboardLayout";
import { Bell, Clock, Trash2 } from "lucide-react";
import React from "react";
import DeleteModal from "./components/DeleteModal";

const notifications = [
  {
    id: 1,
    title: "New message from buyer",
    description: "Someone just sent you a message regarding your listed product.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Product approved",
    description: "Your product 'iPhone 13 Pro Max' has been approved and is now live.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 3,
    title: "Promotion expiring soon",
    description: "Your premium ad will expire in 3 days. Renew to stay on top.",
    time: "2 days ago",
    read: true,
  },
];

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Bell className="text-green-500" /> My Notifications
        </h1>
        <button className="text-sm cursor-pointer text-green-500 hover:underline">
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center gap-4 mt-10 text-gray-500">
          <img src="https://assets.jijistatic.net/static/img/profile-redesign/adverts/no-adverts-images/no-adverts-active.svg" alt="" />
          You have no notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-start p-4 rounded-lg border ${
                n.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
              }`}
            >
              <div>
                <h2
                  className={`font-semibold ${
                    n.read ? "text-gray-800" : "text-green-800"
                  }`}
                >
                  {n.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{n.description}</p>
                <div className="flex items-center text-xs text-gray-400 mt-2 gap-1">
                  <Clock size={12} /> {n.time}
                </div>
              </div>
              <DeleteModal>
                <button
                  className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                  title="Delete notification"
                >
                  <Trash2 size={16} />
                </button>
              </DeleteModal>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Notifications;