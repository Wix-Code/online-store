export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: "MESSAGE" | "SYSTEM" | "PROMOTION" | "ORDER"; // match your enum
  isRead: boolean;
  createdAt: string; 
}

export interface NotificationData {
  notifications: Notification[];
  unreadCount: number;
}

export interface GetNotificationsResponse {
  status: boolean;
  message: string;
  data: NotificationData;
}

export interface NotificationRequest {
  id: number
}