import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { DonorProfile } from "@/types/donor.profile";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  UpdateDonorProfileInput,
  UpdateDonorProfileSchema,
} from "@/validators/donor.validator";

// Get Donors
// GET /donors

export async function getDonors(): Promise<
  ApiResponse<{ donors: DonorProfile[] }>
> {
  try {
    return await apiClient<ApiResponse<{ donors: DonorProfile[] }>>("/donors", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Donor
// GET /donors/:donorId

export async function getDonor(
  donorId: string,
): Promise<ApiResponse<{ donor: DonorProfile }>> {
  try {
    if (!donorId.trim()) {
      return errorResponse("Donor ID is required");
    }

    return await apiClient<ApiResponse<{ donor: DonorProfile }>>(
      `/donors/${donorId}`,
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
  ApiResponse<{ donor: DonorProfile }>
> {
  try {
    return await apiClient<ApiResponse<{ donor: DonorProfile }>>("/donors/me", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Current Donor Profile
// PUT /donors/me

export async function updateMyDonorProfile(
  payload: UpdateDonorProfileInput,
): Promise<ApiResponse<{ donor: DonorProfile }>> {
  try {
    const parse = UpdateDonorProfileSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donor: DonorProfile }>>("/donors/me", {
      method: "PUT",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Current Donor Profile
// DELETE /donors/me

export async function deleteMyDonorProfile(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/donors/me", {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Donor Profile
// PATCH /donors/:donorId

export async function updateDonor(
  donorId: string,
  payload: UpdateDonorProfileInput,
): Promise<ApiResponse<{ donor: DonorProfile }>> {
  try {
    if (!donorId.trim()) {
      return errorResponse("Donor ID is required");
    }

    const parse = UpdateDonorProfileSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ donor: DonorProfile }>>(
      `/donors/${donorId}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Donor Profile
// DELETE /donors/:donorId

export async function deleteDonor(donorId: string): Promise<ApiResponse<null>> {
  try {
    if (!donorId.trim()) {
      return errorResponse("Donor ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/donors/${donorId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
