import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  AddOrganizationMemberInput,
  AddOrganizationMemberSchema,
  CreateOrganizationInput,
  CreateOrganizationSchema,
  OrganizationResponse,
  UpdateOrganizationInput,
  UpdateOrganizationMemberInput,
  UpdateOrganizationMemberSchema,
  UpdateOrganizationSchema,
  UpdateOrganizationStatusInput,
  UpdateOrganizationStatusSchema,
} from "@/validators/organization.validator";

// Get Organizations
// GET /organizations

export async function getOrganizations(): Promise<
  ApiResponse<{ organizations: OrganizationResponse[] } | null>
> {
  try {
    return await apiClient<
      ApiResponse<{ organizations: OrganizationResponse[] }>
    >("/organizations", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Organization
// GET /organizations/:id

export async function getOrganization(
  id: string,
): Promise<ApiResponse<{ organization: OrganizationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<{ organization: OrganizationResponse }>>(
      `/organizations/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Organization
// POST /organizations

export async function createOrganization(
  payload: CreateOrganizationInput,
): Promise<ApiResponse<{ organization: OrganizationResponse } | null>> {
  try {
    const parse = CreateOrganizationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ organization: OrganizationResponse }>>(
      "/organizations",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Organization
// PATCH /organizations/:id

export async function updateOrganization(
  id: string,
  payload: UpdateOrganizationInput,
): Promise<ApiResponse<{ organization: OrganizationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    const parse = UpdateOrganizationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ organization: OrganizationResponse }>>(
      `/organizations/${id}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Organization Status
// PATCH /organizations/:id/status

export async function updateOrganizationStatus(
  id: string,
  payload: UpdateOrganizationStatusInput,
): Promise<ApiResponse<{ organization: OrganizationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    const parse = UpdateOrganizationStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ organization: OrganizationResponse }>>(
      `/organizations/${id}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Organization
// DELETE /organizations/:id

export async function deleteOrganization(
  id: string,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/organizations/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Organization Members
// GET /organizations/:id/members

export async function getOrganizationMembers(
  id: string,
): Promise<ApiResponse<{ members: unknown[] } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<{ members: unknown[] }>>(
      `/organizations/${id}/members`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Add Organization Member
// POST /organizations/:id/members

export async function addOrganizationMember(
  id: string,
  payload: AddOrganizationMemberInput,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    const parse = AddOrganizationMemberSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>(`/organizations/${id}/members`, {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Organization Member
// PATCH /organizations/:id/members/:userId

export async function updateOrganizationMember(
  id: string,
  userId: string,
  payload: UpdateOrganizationMemberInput,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    const parse = UpdateOrganizationMemberSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<null>>(
      `/organizations/${id}/members/${userId}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Remove Organization Member
// DELETE /organizations/:id/members/:userId

export async function removeOrganizationMember(
  id: string,
  userId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Organization ID is required");
    }

    if (!userId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/organizations/${id}/members/${userId}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
