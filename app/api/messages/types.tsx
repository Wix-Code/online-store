export interface MessageRequest {
  senderId?: number,
  sellerId?: number,
  buyerId?: number,
  conversationId?: number,
  receiverId?: number,
  content?: string
}

export interface SendMessageResponse {
  status: boolean;
  message: string;
  data: MessageData;
}

export interface MessageData {
  id: number;
  conversationId: number;
  senderId: number;
  receiverId: number;
  content: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
  sender: UserSummary;
  receiver: UserSummary;
}

export interface UserSummary {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface GetConversationsResponse {
  status: boolean;
  message: string;
  data: Conversation[];
}

export interface Conversation {
  id: number;
  buyerId: number;
  sellerId: number;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
  buyer: UserSummary;
  seller: UserSummary;
  messages: Message[];
}

export interface UserSummary {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  receiverId: number;
  content: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
}
