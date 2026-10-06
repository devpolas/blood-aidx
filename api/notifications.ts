import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateNotificationInput,
  CreateNotificationSchema,
  NotificationResponse,
} from "@/validators/notification.validator";

export async function getNotifications(): Promise<
  ApiResponse<NotificationResponse[]>
> {
  try {
    return await apiClient<ApiResponse<NotificationResponse[]>>(
      "/notifications",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getNotification(
  id: string,
): Promise<ApiResponse<NotificationResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Notification ID is required");
    }

    return await apiClient<ApiResponse<NotificationResponse>>(
      `/notifications/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createNotification(
  payload: CreateNotificationInput,
): Promise<ApiResponse<NotificationResponse>> {
  try {
    const parse = CreateNotificationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid notification input",
      );
    }

    return await apiClient<ApiResponse<NotificationResponse>>(
      "/notifications",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function markNotificationAsRead(
  id: string,
): Promise<ApiResponse<NotificationResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Notification ID is required");
    }

    return await apiClient<ApiResponse<NotificationResponse>>(
      `/notifications/${id}/read`,
      {
        method: "PATCH",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteNotification(
  id: string,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Notification ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/notifications/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
