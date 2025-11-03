import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageRequest } from "./types";
import { getMessage, getUserConversations, markMessageAsRead, sendConversation, sendMessage } from "./operations";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MessageRequest) => sendMessage(data),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["message"] });
    },
  });
};

export const useSendConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MessageRequest) => sendConversation(data),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MessageRequest) => markMessageAsRead(data),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["message"] });
    },
  });
};

export const useGetMessages = (conversationId?: number) => {
  return useQuery({
    queryKey: ["message", conversationId],
    queryFn: () => getMessage(conversationId!),
    enabled: !!conversationId, // ✅ only fetch when we have a valid conversationId
  });
};

export const useGetUserConversations = (userId?: number) => {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => getUserConversations(userId!),
    enabled: !!userId, // Only fetch when we have a userId
  });
};