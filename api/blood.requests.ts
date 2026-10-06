import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  BloodRequestResponse,
  CreateBloodRequestInput,
  CreateBloodRequestSchema,
  UpdateBloodRequestInput,
  UpdateBloodRequestSchema,
  UpdateBloodRequestStatusInput,
  UpdateBloodRequestStatusSchema,
} from "@/validators/blood.request.validator";

// Get Blood Requests
// GET /blood-requests

export async function getBloodRequests(): Promise<
  ApiResponse<{ requests: BloodRequestResponse[] } | null>
> {
  try {
    return await apiClient<ApiResponse<{ requests: BloodRequestResponse[] }>>(
      "/blood-requests",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Blood Request
// GET /blood-requests/:id

export async function getBloodRequest(
  id: string,
): Promise<ApiResponse<{ request: BloodRequestResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Blood request ID is required");
    }

    return await apiClient<ApiResponse<{ request: BloodRequestResponse }>>(
      `/blood-requests/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Blood Request
// POST /blood-requests

export async function createBloodRequest(
  payload: CreateBloodRequestInput,
): Promise<ApiResponse<{ request: BloodRequestResponse } | null>> {
  try {
    const parse = CreateBloodRequestSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ request: BloodRequestResponse }>>(
      "/blood-requests",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Blood Request
// PATCH /blood-requests/:id

export async function updateBloodRequest(
  id: string,
  payload: UpdateBloodRequestInput,
): Promise<ApiResponse<{ request: BloodRequestResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Blood request ID is required");
    }

    const parse = UpdateBloodRequestSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ request: BloodRequestResponse }>>(
      `/blood-requests/${id}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Blood Request Status
// PATCH /blood-requests/:id/status

export async function updateBloodRequestStatus(
  id: string,
  payload: UpdateBloodRequestStatusInput,
): Promise<ApiResponse<{ request: BloodRequestResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Blood request ID is required");
    }

    const parse = UpdateBloodRequestStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ request: BloodRequestResponse }>>(
      `/blood-requests/${id}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Blood Request
// DELETE /blood-requests/:id

export async function deleteBloodRequest(
  id: string,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Blood request ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/blood-requests/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
