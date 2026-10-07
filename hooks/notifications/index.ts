import {
  deleteNotification,
  deleteReadNotifications,
  getNotifications,
  getUnreadNotificationCount,
  getUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/actions/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
  unread: () => [...notificationKeys.all, "unread"] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

// Notifications
export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: getNotifications,
  });
}

// Unread Notifications
export function useUnreadNotifications() {
  return useQuery({
    queryKey: notificationKeys.unread(),
    queryFn: getUnreadNotifications,
  });
}

// Unread Notification Count
export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
  });
}

// Mark Notification As Read
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

// Mark All Notifications As Read
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

// Delete Read Notifications
export function useDeleteReadNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReadNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });
    },
  });
}

// Delete Notification
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}
