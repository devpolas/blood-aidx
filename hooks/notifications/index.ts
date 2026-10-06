import {
  deleteNotification,
  deleteReadNotifications,
  getNotifications,
  getUnreadNotificationCount,
  getUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/api/notifications";

import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),
  });
}

// Mark All Notifications As Read
export function useMarkAllNotificationsAsRead() {
  return useMutation({
    mutationFn: markAllNotificationsAsRead,
  });
}

// Delete Read Notifications
export function useDeleteReadNotifications() {
  return useMutation({
    mutationFn: deleteReadNotifications,
  });
}

// Delete Notification
export function useDeleteNotification() {
  return useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
  });
}
