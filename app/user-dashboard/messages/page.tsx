"use client";

import React, { useState } from "react";
import { Search, Send, MoreVertical, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetMessages,
  useGetUserConversations,
  useSendConversation,
  useSendMessage,
} from "@/app/api/messages";
import { formatTimeAgo } from "@/app/components/format";

const shortMessage = [
  "Last Price",
  "Is it still available?",
  "Can I call you?",
  "Where are you located?",
  "Can you deliver?",
];

const MessagesPage = () => {
  const router = useRouter();

  // ✅ Current logged-in user
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user-object") || "{}")
      : {};

  // ✅ Selected conversation + message input
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // ✅ React Query hooks
  const { data: conversationData, isLoading: convoLoading } = useGetUserConversations(user?.id);
  const { mutateAsync: createConversationApi, isPending: isCreating } = useSendConversation();
  const { mutateAsync: sendMessageApi, isPending: isSending } = useSendMessage();

  // ✅ Get messages for current conversation
  const { data: messagesData, isLoading: messagesLoading } = useGetMessages(
    Number(conversationId)
  );

  const conversations = conversationData?.data?.data || [];
  const messages = messagesData?.data?.messages || [];

  // ✅ Handle chat selection
  const handleChatSelect = async (chat: any) => {
    setSelectedChat(chat);
    if (chat.id) {
      setConversationId(chat.id);
    } else {
      try {
        const res = await createConversationApi({
          buyerId: user.id,
          sellerId: chat.userId,
        });
        setConversationId(res.data.id);
      } catch (err) {
        console.error("Failed to create conversation", err);
      }
    }
  };

  // ✅ Send message
  const handleSend = async () => {
    if (!message.trim() || !selectedChat || !conversationId) return;

    try {
      await sendMessageApi({
        senderId: user.id,
        receiverId:
          user.id === selectedChat.buyerId
            ? selectedChat.sellerId
            : selectedChat.buyerId,
        conversationId,
        content: message,
      });

      setMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="flex h-[85vh] rounded-lg overflow-hidden shadow-sm">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div
              className="text-sm flex items-center gap-1 cursor-pointer text-green-500 hover:underline"
              onClick={() => router.back()}
            >
              <ArrowLeft size={14} />
              Back
            </div>
          </div>

          <div className="relative mt-2">
            <Search
              className="absolute left-2 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-8 pr-2 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {convoLoading ? (
            <div className="flex items-center justify-center py-10 text-gray-400">
              <Loader2 className="animate-spin mr-2" /> Loading conversations...
            </div>
          ) : conversations.length > 0 ? (
            conversations.map((chat: any) => {
              const participant =
                chat.buyerId === user.id ? chat.seller : chat.buyer;

              return (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex items-center border-b border-gray-200 gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                    selectedChat?.id === chat.id ? "bg-green-50" : ""
                  }`}
                >
                  <img
                    src={
                      participant?.avatar ||
                      "https://i.pravatar.cc/150?img=10"
                    }
                    alt={participant?.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">
                      {participant?.firstName} {participant?.lastName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {chat.messages?.[0]?.content || "No messages yet"}
                    </p>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {chat.updatedAt
                      ? new Date(chat.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center py-10 text-gray-400">
              No conversations found.
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <img
                  src={
                    (selectedChat.buyerId === user.id
                      ? selectedChat.seller?.avatar
                      : selectedChat.buyer?.avatar) ||
                    "https://i.pravatar.cc/150?img=5"
                  }
                  alt="chat avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">
                    {selectedChat.buyerId === user.id
                      ? `${selectedChat.seller?.firstName} ${selectedChat.seller?.lastName}`
                      : `${selectedChat.buyer?.firstName} ${selectedChat.buyer?.lastName}`}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isCreating ? "Creating conversation..." : "Active now"}
                  </p>
                </div>
              </div>
              <MoreVertical className="text-gray-500 cursor-pointer" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messagesLoading ? (
                <div className="flex items-center justify-center text-gray-400">
                  <Loader2 className="animate-spin mr-2" /> Loading messages...
                </div>
              ) : messages.length > 0 ? (
                messages.map((msg: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.senderId === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                        msg.senderId === user.id
                          ? "bg-green-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                      <div className="text-[10px] mt-1 text-gray-300 text-right">
                        {formatTimeAgo(msg?.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm py-5">
                  No messages yet.
                </div>
              )}

              {isSending && (
                <div className="flex justify-end">
                  <Loader2 className="animate-spin text-gray-400" size={18} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 flex-col border-t border-gray-200 flex items-center gap-2 bg-white">
              <div className="flex gap-3 items-center flex-wrap justify-center">
                {shortMessage.map((text, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(text)}
                    className="text-sm cursor-pointer rounded-[30px] bg-white py-2 px-4 border border-green-500 text-gray-500 hover:text-gray-700"
                  >
                    {text}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-green-400 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600 disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col gap-2 h-full text-gray-400">
            <img src="https://assets.jijistatic.net/static/img/profile/messenger-girl.svg" alt="" />
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;