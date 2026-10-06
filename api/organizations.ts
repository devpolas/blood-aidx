import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Organization } from "@/types/organization";
import { OrganizationMember } from "@/types/organization.member";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  AddOrganizationMemberInput,
  AddOrganizationMemberSchema,
  CreateOrganizationInput,
  CreateOrganizationSchema,
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
  ApiResponse<{ organizations: Organization[] }>
> {
  try {
    return await apiClient<ApiResponse<{ organizations: Organization[] }>>(
      "/organizations",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Organization
// GET /organizations/:organizationId

export async function getOrganization(
  organizationId: string,
): Promise<ApiResponse<{ organization: Organization }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<{ organization: Organization }>>(
      `/organizations/${organizationId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get My Organizations
// GET /organizations/my

export async function getMyOrganizations(): Promise<
  ApiResponse<{ organizations: Organization[] }>
> {
  try {
    return await apiClient<ApiResponse<{ organizations: Organization[] }>>(
      "/organizations/my",
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
): Promise<ApiResponse<{ organization: Organization }>> {
  try {
    const parse = CreateOrganizationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ organization: Organization }>>(
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
// PATCH /organizations/:organizationId

export async function updateOrganization(
  organizationId: string,
  payload: UpdateOrganizationInput,
): Promise<ApiResponse<{ organization: Organization }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    const parse = UpdateOrganizationSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ organization: Organization }>>(
      `/organizations/${organizationId}`,
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
// PATCH /organizations/:organizationId/status

export async function updateOrganizationStatus(
  organizationId: string,
  payload: UpdateOrganizationStatusInput,
): Promise<ApiResponse<{ organization: Organization }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    const parse = UpdateOrganizationStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ organization: Organization }>>(
      `/organizations/${organizationId}/status`,
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
// DELETE /organizations/:organizationId

export async function deleteOrganization(
  organizationId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/organizations/${organizationId}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Organization Members
// GET /organizations/:organizationId/members

export async function getOrganizationMembers(
  organizationId: string,
): Promise<ApiResponse<{ members: OrganizationMember[] }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    return await apiClient<ApiResponse<{ members: OrganizationMember[] }>>(
      `/organizations/${organizationId}/members`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Add Organization Member
// POST /organizations/:organizationId/members

export async function addOrganizationMember(
  organizationId: string,
  payload: AddOrganizationMemberInput,
): Promise<ApiResponse<{ member: OrganizationMember }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    const parse = AddOrganizationMemberSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ member: OrganizationMember }>>(
      `/organizations/${organizationId}/members`,
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Organization Member
// PATCH /organizations/:organizationId/members/:memberUserId

export async function updateOrganizationMember(
  organizationId: string,
  memberUserId: string,
  payload: UpdateOrganizationMemberInput,
): Promise<ApiResponse<{ member: OrganizationMember }>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    if (!memberUserId.trim()) {
      return errorResponse("User ID is required");
    }

    const parse = UpdateOrganizationMemberSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ member: OrganizationMember }>>(
      `/organizations/${organizationId}/members/${memberUserId}`,
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
// DELETE /organizations/:organizationId/members/:memberUserId

export async function removeOrganizationMember(
  organizationId: string,
  memberUserId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!organizationId.trim()) {
      return errorResponse("Organization ID is required");
    }

    if (!memberUserId.trim()) {
      return errorResponse("User ID is required");
    }

    return await apiClient<ApiResponse<null>>(
      `/organizations/${organizationId}/members/${memberUserId}`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
