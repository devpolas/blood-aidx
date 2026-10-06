import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Review } from "@/types/review";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateReviewInput,
  CreateReviewSchema,
  UpdateReviewInput,
  UpdateReviewSchema,
  UpdateReviewStatusInput,
  UpdateReviewStatusSchema,
} from "@/validators/review.validator";

export async function getMyReviews(): Promise<
  ApiResponse<{ reviews: Review[] }>
> {
  try {
    return await apiClient<ApiResponse<{ reviews: Review[] }>>("/reviews", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReviewsForUser(
  userId: string,
): Promise<ApiResponse<{ reviews: Review[] }>> {
  try {
    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<{ reviews: Review[] }>>(
      `/reviews/user/${userId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReviewsForOrganization(
  organizationId: string,
): Promise<ApiResponse<{ reviews: Review[] }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<{ reviews: Review[] }>>(
      `/reviews/organization/${organizationId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReview(
  reviewId: string,
): Promise<ApiResponse<{ review: Review }>> {
  try {
    if (!reviewId.trim()) {
      return errorResponse("Review ID is required");
    }

    return await apiClient<ApiResponse<{ review: Review }>>(
      `/reviews/${reviewId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createReview(
  payload: CreateReviewInput,
): Promise<ApiResponse<{ review: Review }>> {
  try {
    const parse = CreateReviewSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid review input",
      );
    }

    return await apiClient<ApiResponse<{ review: Review }>>("/reviews", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReview(
  reviewId: string,
  payload: UpdateReviewInput,
): Promise<ApiResponse<{ review: Review }>> {
  try {
    if (!reviewId.trim()) {
      return errorResponse("Review ID is required");
    }

    const parse = UpdateReviewSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid review input",
      );
    }

    return await apiClient<ApiResponse<{ review: Review }>>(
      `/reviews/${reviewId}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReviewStatus(
  reviewId: string,
  payload: UpdateReviewStatusInput,
): Promise<ApiResponse<{ review: Review }>> {
  try {
    if (!reviewId.trim()) {
      return errorResponse("Review ID is required");
    }

    const parse = UpdateReviewStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid review status",
      );
    }

    return await apiClient<ApiResponse<{ review: Review }>>(
      `/reviews/${reviewId}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteReview(
  reviewId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!reviewId.trim()) {
      return errorResponse("Review ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/reviews/${reviewId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
