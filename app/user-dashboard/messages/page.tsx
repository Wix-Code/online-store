"use client";
import React, { useState } from "react";
import { Search, Send, MoreVertical, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Is this still available?",
    time: "2m ago",
    avatar: "https://i.pravatar.cc/150?img=3",
    messages: [
      { from: "buyer", text: "Is this still available?", time: "2m ago" },
      { from: "seller", text: "Yes, it is!", time: "1m ago" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Can you deliver tomorrow?",
    time: "1h ago",
    avatar: "https://i.pravatar.cc/150?img=5",
    messages: [
      { from: "buyer", text: "Can you deliver tomorrow?", time: "1h ago" },
      { from: "seller", text: "Sure! What’s your address?", time: "45m ago" },
    ],
  },
];

const shortMessage = [
  "Last Price",
  "Is it still avalaible?",
  "Can I call you?",
  "Where are you located?",
  "Can you deliver?",
];

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    const newMessage = { from: "seller", text: message, time: "Now" };
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
    });
    setMessage("");
  };

  const router = useRouter();

  return (
    <div className="flex h-[85vh] rounded-lg overflow-hidden shadow-sm">
      {/* Sidebar */}
      <div className="w-1/3 border-r-[1px] border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b-[1px] border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="text-sm flex items-center gap-1 cursor-pointer text-green-500 hover:underline"
              onClick={() => router.back()}
            >
              <ArrowLeft size={14} />
              Back
            </div>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-8 pr-2 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center border-b-[1px] border-gray-200 gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                selectedChat?.id === chat.id ? "bg-green-50" : ""
              }`}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{chat.name}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              <span className="text-[11px] text-gray-400">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-3 border-b-[1px] border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>
              <MoreVertical className="text-gray-500 cursor-pointer" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.from === "seller" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                      msg.from === "seller"
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white border-[1px] border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] mt-1 text-gray-300 text-right">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 flex-col border-t-[1px] border-gray-200 flex items-center gap-2 bg-white">
              <div className="flex gap-3 items-center">
                {
                  shortMessage.map((text, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMessage(text)}
                      className="text-sm cursor-pointer rounded-[30px] bg-white py-3 px-5 border-[1px] border-green-500 text-gray-500 hover:text-gray-700"
                    >
                      {text}
                    </button>
                  ))
                }
              </div>
              <div className="flex items-center gap-2 w-full">
                <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border-[1px] border-gray-200 rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-green-400 outline-none"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-green-500 rounded-full text-white hover:bg-blue-600"
              >
                <Send size={18} />
              </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;