import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { UserMilestone } from "@/types/user.milestone";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateMilestoneInput,
  CreateMilestoneSchema,
  MilestoneQueryInput,
  MilestoneQuerySchema,
  UpdateMilestoneInput,
  UpdateMilestoneSchema,
} from "@/validators/milestone.validator";

// Get Milestones

// GET /milestones
export async function getMilestones(
  query?: MilestoneQueryInput,
): Promise<ApiResponse<UserMilestone[]>> {
  try {
    const queryParse = MilestoneQuerySchema.safeParse(query ?? {});

    if (!queryParse.success) {
      return errorResponse(
        handleZodError(queryParse.error) || "Invalid milestone query",
      );
    }

    return await apiClient<ApiResponse<UserMilestone[]>>("/milestones", {
      method: "GET",
      query: queryParse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Milestone

// GET /milestones/:milestoneId
export async function getMilestone(
  milestoneId: string,
): Promise<ApiResponse<{ milestone: UserMilestone }>> {
  try {
    if (!milestoneId.trim()) {
      return errorResponse("Milestone ID is required");
    }

    return await apiClient<ApiResponse<{ milestone: UserMilestone }>>(
      `/milestones/${milestoneId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get My Milestones

// GET /milestones/my
export async function getMyMilestones(
  query?: MilestoneQueryInput,
): Promise<ApiResponse<UserMilestone[]>> {
  try {
    const queryParse = MilestoneQuerySchema.safeParse(query ?? {});

    if (!queryParse.success) {
      return errorResponse(
        handleZodError(queryParse.error) || "Invalid milestone query",
      );
    }

    return await apiClient<ApiResponse<UserMilestone[]>>("/milestones/my", {
      method: "GET",
      query: queryParse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get User Milestones

// GET /milestones/user/:userId
export async function getUserMilestones(
  userId: string,
  query?: MilestoneQueryInput,
): Promise<ApiResponse<UserMilestone[]>> {
  try {
    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    const queryParse = MilestoneQuerySchema.safeParse(query ?? {});

    if (!queryParse.success) {
      return errorResponse(
        handleZodError(queryParse.error) || "Invalid milestone query",
      );
    }

    return await apiClient<ApiResponse<UserMilestone[]>>(
      `/milestones/user/${userId}`,
      {
        method: "GET",
        query: queryParse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Milestone

// POST /milestones
export async function createMilestone(
  payload: CreateMilestoneInput,
): Promise<ApiResponse<{ milestone: UserMilestone }>> {
  try {
    const parse = CreateMilestoneSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ milestone: UserMilestone }>>(
      "/milestones",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Milestone

// PATCH /milestones/:milestoneId
export async function updateMilestone(
  milestoneId: string,
  payload: UpdateMilestoneInput,
): Promise<ApiResponse<{ milestone: UserMilestone }>> {
  try {
    if (!milestoneId.trim()) {
      return errorResponse("Milestone ID is required");
    }

    const parse = UpdateMilestoneSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ milestone: UserMilestone }>>(
      `/milestones/${milestoneId}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Milestone

// DELETE /milestones/:milestoneId
export async function deleteMilestone(
  milestoneId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!milestoneId.trim()) {
      return errorResponse("Milestone ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/milestones/${milestoneId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
