import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateMessageInput,
  CreateMessageSchema,
  MessageResponse,
  UpdateMessageInput,
  UpdateMessageSchema,
} from "@/validators/message.validator";

export async function getMessages(): Promise<ApiResponse<MessageResponse[]>> {
  try {
    return await apiClient<ApiResponse<MessageResponse[]>>("/messages", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getMessage(
  id: string,
): Promise<ApiResponse<MessageResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Message ID is required");
    }

    return await apiClient<ApiResponse<MessageResponse>>(`/messages/${id}`, {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createMessage(
  payload: CreateMessageInput,
): Promise<ApiResponse<MessageResponse>> {
  try {
    const parse = CreateMessageSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid message input",
      );
    }

    return await apiClient<ApiResponse<MessageResponse>>("/messages", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateMessage(
  id: string,
  payload: UpdateMessageInput,
): Promise<ApiResponse<MessageResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Message ID is required");
    }

    const parse = UpdateMessageSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid message input",
      );
    }

    return await apiClient<ApiResponse<MessageResponse>>(`/messages/${id}`, {
      method: "PATCH",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteMessage(id: string): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Message ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/messages/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
