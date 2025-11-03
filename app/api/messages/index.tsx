import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageRequest } from "./types";
import { markMessageAsRead, sendConversation, sendMessage } from "./operations";

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