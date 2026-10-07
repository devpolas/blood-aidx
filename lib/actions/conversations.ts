import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Conversation } from "@/types/conversation";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  AddParticipantInput,
  AddParticipantSchema,
  CreateConversationInput,
  CreateConversationSchema,
} from "@/validators/conversation.validator";

// Get Conversations
// GET /conversations

export async function getConversations(): Promise<
  ApiResponse<{ conversations: Conversation[] }>
> {
  try {
    return await apiClient<ApiResponse<{ conversations: Conversation[] }>>(
      "/conversations",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Conversation
// GET /conversations/:conversationId

export async function getConversation(
  conversationId: string,
): Promise<ApiResponse<{ conversation: Conversation }>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<{ conversation: Conversation }>>(
      `/conversations/${conversationId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Conversation
// POST /conversations

export async function createConversation(
  payload: CreateConversationInput,
): Promise<ApiResponse<{ conversation: Conversation }>> {
  try {
    const parse = CreateConversationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid conversation input",
      );
    }

    return await apiClient<ApiResponse<{ conversation: Conversation }>>(
      "/conversations",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Add Conversation Participant
// POST /conversations/:conversationId/participants

export async function addConversationParticipant(
  conversationId: string,
  payload: AddParticipantInput,
): Promise<ApiResponse<{ conversation: Conversation }>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    const parse = AddParticipantSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid participant input",
      );
    }

    return await apiClient<ApiResponse<{ conversation: Conversation }>>(
      `/conversations/${conversationId}/participants`,
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Remove Conversation Participant
// DELETE /conversations/:conversationId/participants/:userId

export async function removeConversationParticipant(
  conversationId: string,
  userId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/conversations/${conversationId}/participants/${userId}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Leave Conversation
// POST /conversations/:conversationId/leave

export async function leaveConversation(
  conversationId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!conversationId.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/conversations/${conversationId}/leave`,
      {
        method: "POST",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
