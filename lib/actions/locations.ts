import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import {
  CitiesResponse,
  CountriesResponse,
  Location,
  RegionsResponse,
} from "@/types/location";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  LocationCreateInput,
  LocationCreateSchema,
  LocationUpdateInput,
  LocationUpdateSchema,
} from "@/validators/location.validator";
import { placeDbClient } from "../api.place.client";

// Get My Location
// GET /locations/me

export async function getMyLocation(): Promise<
  ApiResponse<{ location: Location }>
> {
  try {
    return await apiClient<ApiResponse<{ location: Location }>>(
      "/locations/me",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Location
// GET /locations/:locationId

export async function getLocation(
  locationId: string,
): Promise<ApiResponse<{ location: Location }>> {
  try {
    if (!locationId.trim()) {
      return errorResponse("Location ID is required");
    }

    return await apiClient<ApiResponse<{ location: Location }>>(
      `/locations/${locationId}`,
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
): Promise<ApiResponse<{ location: Location }>> {
  try {
    const parse = LocationCreateSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ location: Location }>>("/locations", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Update My Location
// PATCH /locations/me

export async function updateMyLocation(
  payload: LocationUpdateInput,
): Promise<ApiResponse<{ location: Location }>> {
  try {
    const parse = LocationUpdateSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    return await apiClient<ApiResponse<{ location: Location }>>(
      "/locations/me",
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete My Location
// DELETE /locations/me

export async function deleteMyLocation(): Promise<ApiResponse<null>> {
  try {
    return await apiClient<ApiResponse<null>>("/locations/me", {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete Location By ID
// DELETE /locations/:locationId

export async function deleteLocation(
  locationId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!locationId.trim()) {
      return errorResponse("Location ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/locations/${locationId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get World Locations

export const getCountries = async () => {
  return placeDbClient<CountriesResponse>("/countries.json");
};

export const getRegions = async (countryCode: string) => {
  return placeDbClient<RegionsResponse>(
    `/regions/${countryCode.toUpperCase()}.json`,
  );
};

export const getSettlements = async (countryCode: string, regionId: number) => {
  return placeDbClient<CitiesResponse>(
    `/cities/${countryCode.toUpperCase()}/${regionId}.json`,
  );
};
