import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Notification } from "@/types/notification";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";

// Get My Notifications
// GET /notifications

export async function getNotifications(): Promise<
  ApiResponse<{ notifications: Notification[] }>
> {
  try {
    return await apiClient<ApiResponse<{ notifications: Notification[] }>>(
      "/notifications",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Unread Notifications
// GET /notifications/unread

export async function getUnreadNotifications(): Promise<
  ApiResponse<{ notifications: Notification[] }>
> {
  try {
    return await apiClient<ApiResponse<{ notifications: Notification[] }>>(
      "/notifications/unread",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Unread Notification Count
// GET /notifications/unread/count

export async function getUnreadNotificationCount(): Promise<
  ApiResponse<{ count: number }>
> {
  try {
    return await apiClient<ApiResponse<{ count: number }>>(
      "/notifications/unread/count",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Mark Notification As Read
// PATCH /notifications/:notificationId/read

export async function markNotificationAsRead(
  notificationId: string,
): Promise<ApiResponse<{ notification: Notification }>> {
  try {
    if (!notificationId.trim()) {
      return errorResponse("Notification ID is required");
    }

    return await apiClient<ApiResponse<{ notification: Notification }>>(
      `/notifications/${notificationId}/read`,
      {
        method: "PATCH",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Mark All Notifications As Read
// PATCH /notifications/read-all

export async function markAllNotificationsAsRead(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/notifications/read-all", {
      method: "PATCH",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Read Notifications
// DELETE /notifications/read

export async function deleteReadNotifications(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/notifications/read", {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Notification
// DELETE /notifications/:notificationId

export async function deleteNotification(
  notificationId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!notificationId.trim()) {
      return errorResponse("Notification ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/notifications/${notificationId}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
