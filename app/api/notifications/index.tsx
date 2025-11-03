import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotification, getNotificationsByUserId, markAllNotificationsAsRead, markNotificationsAsRead } from "./operations";

export const useGetNotificationsByUserId = (id: number) => {
  return useQuery({
    queryKey: ["notifications", id],
    queryFn: () => getNotificationsByUserId(id),
    enabled: !!id, // only run if id exists
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markNotificationsAsRead(id),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markAllNotificationsAsRead(id),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNotification(id),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};