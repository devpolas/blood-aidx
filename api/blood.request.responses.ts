import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  BloodRequestResponseOutput,
  CreateBloodRequestResponseInput,
  CreateBloodRequestResponseSchema,
  UpdateBloodRequestResponseStatusInput,
  UpdateBloodRequestResponseStatusSchema,
} from "@/validators/blood.request.response.validator";

// Get Blood Request Responses
// GET /blood-request-responses

export async function getBloodRequestResponses(): Promise<
  ApiResponse<{ responses: BloodRequestResponseOutput[] } | null>
> {
  try {
    return await apiClient<
      ApiResponse<{ responses: BloodRequestResponseOutput[] }>
    >("/blood-request-responses", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Blood Request Response
// GET /blood-request-responses/:id

export async function getBloodRequestResponse(
  id: string,
): Promise<ApiResponse<{ response: BloodRequestResponseOutput } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Response ID is required");
    }

    return await apiClient<
      ApiResponse<{ response: BloodRequestResponseOutput }>
    >(`/blood-request-responses/${id}`, {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Blood Request Response
// POST /blood-request-responses/:requestId

export async function createBloodRequestResponse(
  requestId: string,
  payload: CreateBloodRequestResponseInput,
): Promise<ApiResponse<{ response: BloodRequestResponseOutput } | null>> {
  try {
    if (!requestId.trim()) {
      return errorResponse("Blood request ID is required");
    }

    const parse = CreateBloodRequestResponseSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<
      ApiResponse<{ response: BloodRequestResponseOutput }>
    >(`/blood-request-responses/${requestId}`, {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Blood Request Response Status
// PATCH /blood-request-responses/:id/status

export async function updateBloodRequestResponseStatus(
  id: string,
  payload: UpdateBloodRequestResponseStatusInput,
): Promise<ApiResponse<{ response: BloodRequestResponseOutput } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Response ID is required");
    }

    const parse = UpdateBloodRequestResponseStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<
      ApiResponse<{ response: BloodRequestResponseOutput }>
    >(`/blood-request-responses/${id}/status`, {
      method: "PATCH",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Blood Request Response
// DELETE /blood-request-responses/:id

export async function deleteBloodRequestResponse(
  id: string,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Response ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/blood-request-responses/${id}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
