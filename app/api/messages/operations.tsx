import { customAxiosInstance } from "@/app/BaseUrl"
import { GetConversationsResponse, MessageRequest, SendMessageResponse } from "./types"

export const sendMessage = async (data: MessageRequest) => {
  return await customAxiosInstance.post(`/messages`, data)
  //return res.data
}

export const sendConversation = async (data: MessageRequest) => {
  return await customAxiosInstance.post(`/messages/conversations`, data)
  //return res.data
}

export const markMessageAsRead = async (data: MessageRequest) => {
  return await customAxiosInstance.post(`/messages/read`, data)
  //return res.data
}

// ✅ Fetch messages for a specific conversation
export const getMessage = async (conversationId: number, limit = 50, offset = 0) => {
  const res = await customAxiosInstance.get(`/messages`, {
    params: { conversationId, limit, offset },
  });
  return res.data;
};


export const getUserConversations = async (id: number) => {
  return await customAxiosInstance.get<GetConversationsResponse>(`/messages/conversations/${id}`)
  //return res.data
}