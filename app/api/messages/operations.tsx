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

export const getMessage = async () => {
  return await customAxiosInstance.get<SendMessageResponse>(`/message`)
  //return res.data
}

export const getUserConversations = async (id: number) => {
  return await customAxiosInstance.get<GetConversationsResponse>(`/messages/conversations/${id}`)
  //return res.data
}