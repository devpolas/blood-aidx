import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  DonorProfileResponse,
  UpdateDonorProfileInput,
  UpdateDonorProfileSchema,
} from "@/validators/donor.validator";

// Get Donors
// GET /donors

export async function getDonors(): Promise<
  ApiResponse<{ donors: DonorProfileResponse[] } | null>
> {
  try {
    return await apiClient<ApiResponse<{ donors: DonorProfileResponse[] }>>(
      "/donors",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Donor
// GET /donors/:id

export async function getDonor(
  id: string,
): Promise<ApiResponse<{ donor: DonorProfileResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Donor ID is required");
    }

    return await apiClient<ApiResponse<{ donor: DonorProfileResponse }>>(
      `/donors/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Current Donor Profile
// GET /donors/me

export async function getMyDonorProfile(): Promise<
  ApiResponse<{ donor: DonorProfileResponse } | null>
> {
  try {
    return await apiClient<ApiResponse<{ donor: DonorProfileResponse }>>(
      "/donors/me",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Current Donor Profile
// PATCH /donors/me

export async function updateMyDonorProfile(
  payload: UpdateDonorProfileInput,
): Promise<ApiResponse<{ donor: DonorProfileResponse } | null>> {
  try {
    const parse = UpdateDonorProfileSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donor: DonorProfileResponse }>>(
      "/donors/me",
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Donor Profile
// PATCH /donors/:id

export async function updateDonor(
  id: string,
  payload: UpdateDonorProfileInput,
): Promise<ApiResponse<{ donor: DonorProfileResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Donor ID is required");
    }

    const parse = UpdateDonorProfileSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donor: DonorProfileResponse }>>(
      `/donors/${id}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
