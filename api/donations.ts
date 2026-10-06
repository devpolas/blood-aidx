import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { BloodDonation } from "@/types/blood.donation";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  CreateDonationInput,
  CreateDonationSchema,
  UpdateDonationStatusInput,
  UpdateDonationStatusSchema,
} from "@/validators/donation.validator";

// Get My Donations
// GET /donations/me

export async function getMyDonations(): Promise<
  ApiResponse<{ donations: BloodDonation[] }>
> {
  try {
    return await apiClient<ApiResponse<{ donations: BloodDonation[] }>>(
      "/donations/me",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Donations
// GET /donations

export async function getDonations(): Promise<
  ApiResponse<{ donations: BloodDonation[] }>
> {
  try {
    return await apiClient<ApiResponse<{ donations: BloodDonation[] }>>(
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
// GET /donations/:donationId

export async function getDonation(
  donationId: string,
): Promise<ApiResponse<{ donation: BloodDonation }>> {
  try {
    if (!donationId.trim()) {
      return errorResponse("Donation ID is required");
    }

    return await apiClient<ApiResponse<{ donation: BloodDonation }>>(
      `/donations/${donationId}`,
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
): Promise<ApiResponse<{ donation: BloodDonation }>> {
  try {
    const parse = CreateDonationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donation: BloodDonation }>>(
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

// Cancel My Donation
// POST /donations/:donationId/cancel

export async function cancelDonation(
  donationId: string,
): Promise<ApiResponse<{ donation: BloodDonation }>> {
  try {
    if (!donationId.trim()) {
      return errorResponse("Donation ID is required");
    }

    return await apiClient<ApiResponse<{ donation: BloodDonation }>>(
      `/donations/${donationId}/cancel`,
      {
        method: "POST",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Verify Donation
// PATCH /donations/:donationId/verify

export async function verifyDonation(
  donationId: string,
  payload: UpdateDonationStatusInput,
): Promise<ApiResponse<{ donation: BloodDonation }>> {
  try {
    if (!donationId.trim()) {
      return errorResponse("Donation ID is required");
    }

    const parse = UpdateDonationStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donation: BloodDonation }>>(
      `/donations/${donationId}/verify`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
