import { customAxiosInstance } from "@/app/BaseUrl"
import { GetNotificationsResponse, NotificationRequest } from "./types"

export const getNotificationsByUserId = async (id: number) => {
  const res = await customAxiosInstance.get<GetNotificationsResponse>(`/notifications/user/${id}`)
  return res.data
}

export const markNotificationsAsRead = async (id: number) => {
  return await customAxiosInstance.post<NotificationRequest>(`/notifications/${id}/read`)
  //return res.data
}

export const markAllNotificationsAsRead = async (id: number) => {
  return await customAxiosInstance.post<NotificationRequest>(`/notifications/user/${id}/read-all`)
  //return res.data
}

export const deleteNotification = async (id: number) => {
  return await customAxiosInstance.delete<NotificationRequest>(`/notifications/${id}`)
  //return res.data
}