import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateReviewInput,
  CreateReviewSchema,
  ReviewResponse,
  UpdateReviewInput,
  UpdateReviewSchema,
  UpdateReviewStatusInput,
  UpdateReviewStatusSchema,
} from "@/validators/review.validator";

export async function getReviews(): Promise<ApiResponse<ReviewResponse[]>> {
  try {
    return await apiClient<ApiResponse<ReviewResponse[]>>("/reviews", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReview(
  id: string,
): Promise<ApiResponse<ReviewResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    return await apiClient<ApiResponse<ReviewResponse>>(`/reviews/${id}`, {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createReview(
  payload: CreateReviewInput,
): Promise<ApiResponse<ReviewResponse>> {
  try {
    const parse = CreateReviewSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid review input",
      );
    }

    return await apiClient<ApiResponse<ReviewResponse>>("/reviews", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReview(
  id: string,
  payload: UpdateReviewInput,
): Promise<ApiResponse<ReviewResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    const parse = UpdateReviewSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid review input",
      );
    }

    return await apiClient<ApiResponse<ReviewResponse>>(`/reviews/${id}`, {
      method: "PATCH",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReviewStatus(
  id: string,
  payload: UpdateReviewStatusInput,
): Promise<ApiResponse<ReviewResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    const parse = UpdateReviewStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid review status",
      );
    }

    return await apiClient<ApiResponse<ReviewResponse>>(
      `/reviews/${id}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteReview(id: string): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/reviews/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
