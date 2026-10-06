import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  ProfileResponse,
  UpdateProfileInput,
  UpdateProfileSchema,
} from "@/validators/profile.validator";

export async function getProfile(
  userId: string,
): Promise<ApiResponse<ProfileResponse>> {
  try {
    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<ProfileResponse>>(
      `/profiles/${userId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateProfile(
  userId: string,
  payload: UpdateProfileInput,
): Promise<ApiResponse<ProfileResponse>> {
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

    return await apiClient<ApiResponse<ProfileResponse>>(
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
