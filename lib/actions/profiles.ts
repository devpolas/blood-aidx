import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { UserProfile } from "@/types/user.profile";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  UpdateProfileInput,
  UpdateProfileSchema,
} from "@/validators/profile.validator";

// Get My Profile
// GET /profiles/me

export async function getMyProfile(): Promise<
  ApiResponse<{ profile: UserProfile }>
> {
  try {
    return await apiClient<ApiResponse<{ profile: UserProfile }>>(
      "/profiles/me",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update My Profile
// PUT /profiles/me

export async function updateMyProfile(
  payload: UpdateProfileInput,
): Promise<ApiResponse<{ profile: UserProfile }>> {
  try {
    const parse = UpdateProfileSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid profile input",
      );
    }

    return await apiClient<ApiResponse<{ profile: UserProfile }>>(
      "/profiles/me",
      {
        method: "PUT",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete My Profile
// DELETE /profiles/me

export async function deleteMyProfile(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/profiles/me", {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get User Profile
// GET /profiles/:userId

export async function getProfile(
  userId: string,
): Promise<ApiResponse<{ profile: UserProfile }>> {
  try {
    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<{ profile: UserProfile }>>(
      `/profiles/${userId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update User Profile
// PATCH /profiles/:userId

export async function updateProfile(
  userId: string,
  payload: UpdateProfileInput,
): Promise<ApiResponse<{ profile: UserProfile }>> {
  try {
    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    const parse = UpdateProfileSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid profile input",
      );
    }

    return await apiClient<ApiResponse<{ profile: UserProfile }>>(
      `/profiles/${userId}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete User Profile
// DELETE /profiles/:userId

export async function deleteProfile(
  userId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/profiles/${userId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
