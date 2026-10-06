import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  resourceType: string;
}

export interface DeleteCloudinaryFileInput {
  publicId: string;
  resourceType: string;
}

export async function uploadFile(
  file: File,
): Promise<ApiResponse<CloudinaryUploadResult>> {
  try {
    if (!(file instanceof File)) {
      return errorResponse("File is required");
    }

    const formData = new FormData();
    formData.append("file", file);

    return await apiClient<ApiResponse<CloudinaryUploadResult>>("/uploads", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteFile(
  payload: DeleteCloudinaryFileInput,
): Promise<ApiResponse<null>> {
  try {
    if (!payload.publicId.trim()) {
      return errorResponse("Public ID is required");
    }

    if (!payload.resourceType.trim()) {
      return errorResponse("Resource type is required");
    }

    return await apiClient<ApiResponse<null>>("/uploads", {
      method: "DELETE",
      body: payload,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
