import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  CreateDonationInput,
  CreateDonationSchema,
  DonationResponse,
  UpdateDonationStatusInput,
  UpdateDonationStatusSchema,
} from "@/validators/donation.validator";

// Get Donations
// GET /donations

export async function getDonations(): Promise<
  ApiResponse<{ donations: DonationResponse[] } | null>
> {
  try {
    return await apiClient<ApiResponse<{ donations: DonationResponse[] }>>(
      "/donations",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Donation
// GET /donations/:id

export async function getDonation(
  id: string,
): Promise<ApiResponse<{ donation: DonationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Donation ID is required");
    }

    return await apiClient<ApiResponse<{ donation: DonationResponse }>>(
      `/donations/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Donation
// POST /donations

export async function createDonation(
  payload: CreateDonationInput,
): Promise<ApiResponse<{ donation: DonationResponse } | null>> {
  try {
    const parse = CreateDonationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donation: DonationResponse }>>(
      "/donations",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Donation Status
// PATCH /donations/:id/status

export async function updateDonationStatus(
  id: string,
  payload: UpdateDonationStatusInput,
): Promise<ApiResponse<{ donation: DonationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Donation ID is required");
    }

    const parse = UpdateDonationStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donation: DonationResponse }>>(
      `/donations/${id}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
