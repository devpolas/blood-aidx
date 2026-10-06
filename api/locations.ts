import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  LocationCreateInput,
  LocationCreateSchema,
  LocationUpdateInput,
  LocationUpdateSchema,
} from "@/validators/location.validator";

export type LocationResponse = LocationCreateInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// Get Locations
// GET /locations

export async function getLocations(): Promise<
  ApiResponse<{ locations: LocationResponse[] } | null>
> {
  try {
    return await apiClient<ApiResponse<{ locations: LocationResponse[] }>>(
      "/locations",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Location
// GET /locations/:id

export async function getLocation(
  id: string,
): Promise<ApiResponse<{ location: LocationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Location ID is required");
    }

    return await apiClient<ApiResponse<{ location: LocationResponse }>>(
      `/locations/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Create Location
// POST /locations

export async function createLocation(
  payload: LocationCreateInput,
): Promise<ApiResponse<{ location: LocationResponse } | null>> {
  try {
    const parse = LocationCreateSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ location: LocationResponse }>>(
      "/locations",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Update Location
// PATCH /locations/:id

export async function updateLocation(
  id: string,
  payload: LocationUpdateInput,
): Promise<ApiResponse<{ location: LocationResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Location ID is required");
    }

    const parse = LocationUpdateSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ location: LocationResponse }>>(
      `/locations/${id}`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Location
// DELETE /locations/:id

export async function deleteLocation(id: string): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Location ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/locations/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
