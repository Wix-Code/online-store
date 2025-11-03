import { customAxiosInstance } from "@/app/BaseUrl"
import { GetNotificationsResponse } from "./types"

export const getNotifications = async () => {
  return await customAxiosInstance.get<GetNotificationsResponse>(`/`)
}