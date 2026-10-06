import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  AddParticipantInput,
  AddParticipantSchema,
  ConversationResponse,
  CreateConversationInput,
  CreateConversationSchema,
} from "@/validators/conversation.validator";

export async function getConversations(): Promise<
  ApiResponse<ConversationResponse[]>
> {
  try {
    return await apiClient<ApiResponse<ConversationResponse[]>>(
      "/conversations",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getConversation(
  id: string,
): Promise<ApiResponse<ConversationResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<ConversationResponse>>(
      `/conversations/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createConversation(
  payload: CreateConversationInput,
): Promise<ApiResponse<ConversationResponse>> {
  try {
    const parse = CreateConversationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid conversation input",
      );
    }

    return await apiClient<ApiResponse<ConversationResponse>>(
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

export async function addConversationParticipant(
  conversationId: string,
  payload: AddParticipantInput,
): Promise<ApiResponse<ConversationResponse>> {
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

    return await apiClient<ApiResponse<ConversationResponse>>(
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

export async function deleteConversation(
  id: string,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Conversation ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/conversations/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
