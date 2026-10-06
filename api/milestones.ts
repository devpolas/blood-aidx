import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  CreateMilestoneInput,
  CreateMilestoneSchema,
  MilestoneResponse,
  UpdateMilestoneInput,
  UpdateMilestoneSchema,
} from "@/validators/milestone.validator";

// Get Milestones
// GET /milestones

export async function getMilestones(): Promise<
  ApiResponse<{ milestones: MilestoneResponse[] } | null>
> {
  try {
    return await apiClient<ApiResponse<{ milestones: MilestoneResponse[] }>>(
      "/milestones",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Milestone
// GET /milestones/:id

export async function getMilestone(
  id: string,
): Promise<ApiResponse<{ milestone: MilestoneResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Milestone ID is required");
    }

    return await apiClient<ApiResponse<{ milestone: MilestoneResponse }>>(
      `/milestones/${id}`,
      {
        method: "GET",
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
): Promise<ApiResponse<{ milestone: MilestoneResponse } | null>> {
  try {
    const parse = CreateMilestoneSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ milestone: MilestoneResponse }>>(
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
// PATCH /milestones/:id

export async function updateMilestone(
  id: string,
  payload: UpdateMilestoneInput,
): Promise<ApiResponse<{ milestone: MilestoneResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Milestone ID is required");
    }

    const parse = UpdateMilestoneSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ milestone: MilestoneResponse }>>(
      `/milestones/${id}`,
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
// DELETE /milestones/:id

export async function deleteMilestone(id: string): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Milestone ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/milestones/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
