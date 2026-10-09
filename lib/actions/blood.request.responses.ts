import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { BloodRequestResponse } from "@/types/blood.request.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  BloodRequestResponseQueryInput,
  BloodRequestResponseQuerySchema,
  CreateBloodRequestResponseInput,
  CreateBloodRequestResponseSchema,
  UpdateBloodRequestResponseStatusInput,
  UpdateBloodRequestResponseStatusSchema,
} from "@/validators/blood.request.response.validator";

// Get My Blood Request Responses

// GET /blood-request-responses/me
export async function getMyBloodRequestResponses(
  query?: BloodRequestResponseQueryInput,
): Promise<ApiResponse<{ responses: BloodRequestResponse[] }>> {
  try {
    const queryParse = BloodRequestResponseQuerySchema.safeParse(query ?? {});

    if (!queryParse.success) {
      return errorResponse(
        handleZodError(queryParse.error) ||
          "Invalid blood request response query",
      );
    }

    return await apiClient<ApiResponse<{ responses: BloodRequestResponse[] }>>(
      "/blood-request-responses/me",
      {
        method: "GET",
        query: queryParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Responses for a Blood Request

// GET /blood-request-responses/requests/:requestId
export async function getBloodRequestResponses(
  requestId: string,
  query?: BloodRequestResponseQueryInput,
): Promise<ApiResponse<{ responses: BloodRequestResponse[] }>> {
  try {
    if (!requestId.trim()) {
      return errorResponse("Blood request ID is required");
    }

    const queryParse = BloodRequestResponseQuerySchema.safeParse(query ?? {});

    if (!queryParse.success) {
      return errorResponse(
        handleZodError(queryParse.error) ||
          "Invalid blood request response query",
      );
    }

    return await apiClient<ApiResponse<{ responses: BloodRequestResponse[] }>>(
      `/blood-request-responses/requests/${requestId}`,
      {
        method: "GET",
        query: queryParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Blood Request Response

// POST /blood-request-responses/requests/:requestId
export async function createBloodRequestResponse(
  requestId: string,
  payload: CreateBloodRequestResponseInput,
): Promise<ApiResponse<{ response: BloodRequestResponse }>> {
  try {
    if (!requestId.trim()) {
      return errorResponse("Blood request ID is required");
    }

    const parse = CreateBloodRequestResponseSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ response: BloodRequestResponse }>>(
      `/blood-request-responses/requests/${requestId}`,
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Individual Blood Request Response

// GET /blood-request-responses/:responseId
export async function getBloodRequestResponse(
  responseId: string,
): Promise<ApiResponse<{ response: BloodRequestResponse }>> {
  try {
    if (!responseId.trim()) {
      return errorResponse("Response ID is required");
    }

    return await apiClient<ApiResponse<{ response: BloodRequestResponse }>>(
      `/blood-request-responses/${responseId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Blood Request Response Status

// PATCH /blood-request-responses/:responseId/status
export async function updateBloodRequestResponseStatus(
  responseId: string,
  payload: UpdateBloodRequestResponseStatusInput,
): Promise<ApiResponse<{ response: BloodRequestResponse }>> {
  try {
    if (!responseId.trim()) {
      return errorResponse("Response ID is required");
    }

    const parse = UpdateBloodRequestResponseStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ response: BloodRequestResponse }>>(
      `/blood-request-responses/${responseId}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Cancel My Blood Request Response

// POST /blood-request-responses/:responseId/cancel
export async function cancelBloodRequestResponse(
  responseId: string,
): Promise<ApiResponse<{ response: BloodRequestResponse }>> {
  try {
    if (!responseId.trim()) {
      return errorResponse("Response ID is required");
    }

    return await apiClient<ApiResponse<{ response: BloodRequestResponse }>>(
      `/blood-request-responses/${responseId}/cancel`,
      {
        method: "POST",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete My Blood Request Response

// DELETE /blood-request-responses/:responseId
export async function deleteBloodRequestResponse(
  responseId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!responseId.trim()) {
      return errorResponse("Response ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/blood-request-responses/${responseId}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
