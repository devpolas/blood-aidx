import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Message } from "@/types/message";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  CreateMessageInput,
  CreateMessageSchema,
  UpdateMessageInput,
  UpdateMessageSchema,
} from "@/validators/message.validator";

// Create Message
// POST /messages

export async function createMessage(
  payload: CreateMessageInput,
): Promise<ApiResponse<{ message: Message }>> {
  try {
    const parse = CreateMessageSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid message input",
      );
    }

    return await apiClient<ApiResponse<{ message: Message }>>("/messages", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Conversation Messages
// GET /messages/conversation/:conversationId

export async function getConversationMessages(
  conversationId: string,
): Promise<ApiResponse<{ messages: Message[] }>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<{ messages: Message[] }>>(
      `/messages/conversation/${conversationId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Mark Conversation Messages As Read
// PATCH /messages/conversation/:conversationId/read

export async function markConversationMessagesAsRead(
  conversationId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/messages/conversation/${conversationId}/read`,
      {
        method: "PATCH",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Unread Message Count
// GET /messages/conversation/:conversationId/unread-count

export async function getUnreadCount(
  conversationId: string,
): Promise<ApiResponse<{ count: number }>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<{ count: number }>>(
      `/messages/conversation/${conversationId}/unread-count`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Moderate Delete Message
// DELETE /messages/:messageId/moderate

export async function moderateDeleteMessage(
  messageId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!messageId.trim()) {
      return errorResponse("Message ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/messages/${messageId}/moderate`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Message
// GET /messages/:messageId

export async function getMessage(
  messageId: string,
): Promise<ApiResponse<{ message: Message }>> {
  try {
    if (!messageId.trim()) {
      return errorResponse("Message ID is required");
    }

    return await apiClient<ApiResponse<{ message: Message }>>(
      `/messages/${messageId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Message
// PATCH /messages/:messageId

export async function updateMessage(
  messageId: string,
  payload: UpdateMessageInput,
): Promise<ApiResponse<{ message: Message }>> {
  try {
    if (!messageId.trim()) {
      return errorResponse("Message ID is required");
    }

    const parse = UpdateMessageSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid message input",
      );
    }

    return await apiClient<ApiResponse<{ message: Message }>>(
      `/messages/${messageId}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Message
// DELETE /messages/:messageId

export async function deleteMessage(
  messageId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!messageId.trim()) {
      return errorResponse("Message ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/messages/${messageId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Mark Message As Read
// PATCH /messages/:messageId/read

export async function markMessageAsRead(
  messageId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!messageId.trim()) {
      return errorResponse("Message ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/messages/${messageId}/read`, {
      method: "PATCH",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
